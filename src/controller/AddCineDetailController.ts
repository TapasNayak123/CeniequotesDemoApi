import { Request, Response } from 'express';
import { CineListModel } from "../models/CineListModel";
import dBConfig from "../config/dbConfig";
import axios from 'axios';
export class AddCineDetailController {

    public async addCineDetails(request: Request, response: Response) {
        const requestBody: CineListModel = request.body;
      //  this.getTranslatedQuotes(requestBody)
        this.addDataToDB(requestBody, response);
    }
    private async addDataToDB(requestBody: CineListModel, response: Response) {
        const dbInstance = dBConfig.cineQuotesDB.doc();
        const id: any = dbInstance.id;
        requestBody.createdAt = Date.now();
        requestBody.updatedAt = Date.now();
        requestBody.id = id;
        try {
            const isMovieAdded = await dBConfig.cineQuotesDB.where('FilmTitle', '==', requestBody.FilmTitle).get();
            if (isMovieAdded.docs.length > 0) {
                return response.json({
                    status: 200,
                    success: true,
                    msg: "Movie Already Added !!!!!!!!!!!!"
                })
            } else {
                await dbInstance.set(requestBody)
                    .then(added => {
                        this.getTranslatedQuotes(requestBody)
                        return response.json({
                            status: 200,
                            success: true,
                            msg: "User added successfully"
                        })
                    })
                    .catch(error => {
                        console.log("Data added error block  ", error)
                    })
            }

        } catch (err) {
            console.log("Print error ", err)
            return err;
        }
    }
    private async updateQuotesToDB(requestBody: CineListModel) {
        const dbInstance = dBConfig.cineQuotesDB.doc(requestBody.id);
        await dbInstance.set(requestBody, { merge: true })
            .then(updated => {
                console.log("database updated successfully !!!!!!!!!")
            })
            .catch(error => {
                console.log("Data added error block  ", error)
            })

    }
    private async getTranslatedQuotes(requestBody: CineListModel) {
        const trnslateReq = {
            "defaultLanguage":requestBody.defaultLanguage,
            "quote": (requestBody.defaultLanguage === 1) ? requestBody.Quote.EN : requestBody.Quote.FR
        }
        await axios.post('http://localhost:8085/translate-api/translate',trnslateReq)
            .then(resp => {
                if (resp.data.status) {
                    console.log("Translated text ", resp.data.translatedText)
                    if(requestBody.defaultLanguage === 1){
                        requestBody.Quote.FR = resp.data.translatedText;
                    }else {
                        requestBody.Quote.EN = resp.data.translatedText;
                    }

                    this.updateQuotesToDB(requestBody)
                }
            });

    }
}