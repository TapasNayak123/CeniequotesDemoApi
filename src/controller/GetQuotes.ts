import { Request, Response } from "express";
import dbConfig from "../config/dbConfig";
export class GetQuotes {
    public async getQuotes(req: Request, resp: Response) {
        try {
            const getMovieQuotes = await dbConfig.cineQuotesDB.where('FilmTitle', '==', req.params.movieName).get();
            getMovieQuotes.forEach((document: any) => {
                const quoteObj: any = document.data().Quote;
                if (typeof quoteObj === 'undefined' || typeof quoteObj === null) {
                    return resp.json({
                        status: 200,
                        success: true,
                        msg: "No Quotes found for this movie"
                    })
                } else {
                    return resp.json({
                        status: 200,
                        success: true,
                        quotes: quoteObj
                    })
                }

            })

        } catch (error) {
            return error;

        }
    }

}