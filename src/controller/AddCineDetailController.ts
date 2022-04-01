import { Request, Response } from 'express';
import PubSub = require("@google-cloud/pubsub");
import { CineListModel } from "../models/CineListModel";
import dBConfig from "../config/dbConfig";
import { GoogleTranslateConfig } from '../config/GoogleTranslateConfig';
import AppConfig from '../config/AppConfig';

export class AddCineDetailController {

    public async addCineDetails(request: Request, response: Response) {
        const requestBody: CineListModel = request.body;
        this.addDataToDB(requestBody, response);
        // this.doPubSubConfiguration(requestBody)
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
                    success: true,
                    msg: "Movie Already Added !!!!!!!!!!!!"
                })
            } else {
                await dbInstance.set(requestBody)
                    .then(added => {
                        this.doPubSubConfiguration(requestBody);
                        return response.json({
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

    private async transalateDataToExpectedlanguage(quoteData: string, requestBody: CineListModel) {
        const translatedText = await new GoogleTranslateConfig().translateEnglishToFrench(quoteData)
        requestBody.Quote.FR = translatedText;
        this.updateQuotesToDB(requestBody);
    }
    private async updateQuotesToDB(requestBody: CineListModel) {
        const dbInstance = dBConfig.cineQuotesDB.doc(requestBody.id);
        await dbInstance.set(requestBody , { merge: true })
            .then(updated => {
                console.log("database updated successfully !!!!!!!!!")
            })
            .catch(error => {
                console.log("Data added error block  ", error)
            })

    }

    private async doPubSubConfiguration(requestBody: CineListModel) {
        // Pubsub related work will done here
        const pubSub: PubSub.PubSub = new (PubSub as any).PubSub();
        // pubSub.
        const [topic] = await pubSub.createTopic(AppConfig.PUBSUB_TOPIC_NAME);
        const [subscription] = await topic.createSubscription(AppConfig.PUBSUB_TOPIC_SUBSCRIPTION);
        subscription.on('message', message => {
            this.transalateDataToExpectedlanguage(JSON.parse(message.data).quoteText, requestBody)
            message.ack();
            this.clearPubSubData(AppConfig.PUBSUB_TOPIC_SUBSCRIPTION, AppConfig.PUBSUB_TOPIC_NAME,pubSub);
        });
        const pubsubData = {
            quoteText: requestBody.Quote.EN
        }
        const data = Buffer.from(JSON.stringify(pubsubData));
        topic.publishMessage({ data }, err => {
            if (err) {
                console.log("Inside error block!!!!!!!!!")
            } else {
                console.log("Message published !!!!!!!!!", data.toString())
            }
        });

    }

    private async clearPubSubData(subcription:string,topicID:string,pubSubClient:PubSub.PubSub){
        await pubSubClient.topic(topicID).delete();
        console.log("Topic deleted !!!!!!!!!!!")
        await pubSubClient.subscription(subcription).delete();
        console.log("Subscription deleted !!!!!!!!!!!");
        process.exit(0);

    }
}