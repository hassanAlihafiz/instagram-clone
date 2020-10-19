import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyC9wau4aYSHZGnRdPe658Pt7UrSfHXZTcE",
  authDomain: "react-firebase-8a4b5.firebaseapp.com",
  databaseURL: "https://react-firebase-8a4b5.firebaseio.com",
  projectId: "react-firebase-8a4b5",
  storageBucket: "react-firebase-8a4b5.appspot.com",
  messagingSenderId: "515547933103",
  appId: "1:515547933103:web:4abab9883292e8f61be75a",
};
//initialize app
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
