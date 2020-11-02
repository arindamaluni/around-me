import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// Replace the following with the config for your own Firebase project
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAqk1HRPmushNirOZ0LdGcUQVocd7LWyAE",
  authDomain: "daily-moments-d677f.firebaseapp.com",
  databaseURL: "https://daily-moments-d677f.firebaseio.com",
  projectId: "daily-moments-d677f",
  storageBucket: "daily-moments-d677f.appspot.com",
  messagingSenderId: "309263458225",
  appId: "1:309263458225:web:0753a835b14f4828366790"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();
