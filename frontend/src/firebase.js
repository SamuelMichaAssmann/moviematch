//Import Core_Firebase SDK - has to be installed and named first
import firebase from "firebase/app"

//Import Analytics for project (Optional)
import "firebase/auth"

//Import desired firebase-modules (products)
import "firebase/auth" //import firebase_Authentification
import "firebase/database" //import firebase_RealtimeDatabase

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}
firebase.initializeApp(firebaseConfig);

export default firebase;