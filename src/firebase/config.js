import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


var firebaseConfig = {
        apiKey:   process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderID: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId:process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const firebaseAuth = firebase.auth();

export {database, firebaseAuth};
