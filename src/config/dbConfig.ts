import * as firebaseAdmin from 'firebase-admin';
import AppConfig  from './AppConfig';

import firebaseServiceAccountKey from '../auth-files/cinequotes-firebase-auth.json';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(
      firebaseServiceAccountKey as any
    ),
    databaseURL:AppConfig.DATABASE_URL,
  });
}

const cineQuotesDB =  firebaseAdmin.firestore().collection('CineQuotes');
export default {
    cineQuotesDB
}