import { Request, Response } from "express";
import { CineListModel } from "../models/CineListModel";
import dbConfig from "../config/dbConfig";
export class GetMovieList {
    public async getMovieLists(req: Request, resp: Response) {
        const cineQuotList: any = [];
        try {
            const getMovieList = await dbConfig.cineQuotesDB.get();
            getMovieList.forEach((document: any) => {
                const cineListObj: CineListModel = document.data().FilmTitle;
                cineQuotList.push(cineListObj)
            })
            if (cineQuotList.length > 0) {
                return resp.json({
                    status: 200,
                    success: true,
                    filmList: cineQuotList
                })
            } else {
                return resp.json({
                    status: 200,
                    msg: "No Movies found !!!!!!!!!!"
                })
            }
        } catch (err) {
            return err;
        }
    }

}