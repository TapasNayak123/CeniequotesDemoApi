import admin from 'firebase-admin';
const db = admin.firestore();
const cineQuotesDB = db.collection('CineQuotes');
export default {
    cineQuotesDB
}