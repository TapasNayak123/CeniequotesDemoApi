import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

export default {
    PORT: process.env.PORT,
    NODE_ENVIROMENT: process.env.NODE_ENV,
    DATABASE_URL:process.env.DATABASE_URL,
    GOOGLE_TRANSALATOR_API_KEY:process.env.GOOGLE_TRANSALATOR_API_KEY,
    TRANSALATE_LANGUAGE:process.env.TRANSALATE_LANGUAGE,
    GCP_PROJECT_ID:process.env.GCP_PROJECT_ID,
    PUBSUB_TOPIC_NAME:"Transalate",
    PUBSUB_TOPIC_SUBSCRIPTION:"Trnsalate_Subscription"
}