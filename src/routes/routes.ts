import { Request, Response, Router } from "express";
import { AddCineDetailController } from "../controller/AddCineDetailController";
import { GetMovieList } from "../controller/GetMovieList";
import { GetQuotes } from "../controller/GetQuotes";
import { GetActor } from "../controller/GetActor";
import dbConfig from "../config/dbConfig";
export const router = Router();

router.get("/", (req, res) => {
    res.json({
        status: 200,
        msg: "Server created successfully !!!",
    });
});

router.post("/cinequotes-api/addMovieDetails",
    (req: Request, res: Response) => {
        return new AddCineDetailController().addCineDetails(req, res)
    })

router.get("/cinequotes-api/getMovieList",
    (req: Request, resp: Response) => {
        return new GetMovieList().getMovieLists(req, resp)
    })
router.get("/cinequotes-api/getQuotes/:movieName/quotes/:id",
    (req: Request, resp: Response) => {
        return new GetQuotes().getQuotes(req, resp)
    })
router.get("/cinequotes-api/getActor/:quotes/:id",
    (req: Request, resp: Response) => {
        return new GetActor().getActor(req, resp)
    })