import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyAtaRQcj0-pzvT39TmC663YTqF_Ueqe2r8",
    authDomain: "transactions-trail.firebaseapp.com",
    projectId: "transactions-trail",
    storageBucket: "transactions-trail.appspot.com",
    messagingSenderId: "175795049561",
    appId: "1:175795049561:web:31c063ef468ab4b5d60d48"
};


const app=firebase.initializeApp(firebaseConfig);

export const auth=app.auth();
export default firebase;