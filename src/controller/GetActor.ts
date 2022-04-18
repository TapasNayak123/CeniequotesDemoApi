import { Request, Response } from "express";
import dbConfig from "../config/dbConfig";
export class GetActor {
    public async getActor(req: Request, resp: Response) {
        console.log("Print req params ", req.params)
        try {
            const getMovieQuotes = await dbConfig.cineQuotesDB.where('FilmTitle', '==', req.params.quotes).get();
            getMovieQuotes.forEach((document: any) => {
                const quoteObj: any = document.data().Quote;
                if (typeof quoteObj === 'undefined' || typeof quoteObj === null) {
                    return resp.json({
                        status: 200,
                        success: true,
                        msg: "No Quotes found for this movie"
                    })
                } else {
                    const quoteDetails = req.params.id === '1' ? quoteObj.EN : quoteObj.FR
                    const respObj = {
                        quote: quoteDetails,
                        actor: document.data().Actor
                    }
                    return resp.json({
                        status: 200,
                        success: true,
                        actor: respObj
                    })
                }

            })
        } catch (error) {
            return error;
        }
    }

}