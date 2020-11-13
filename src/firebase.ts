import firebase from 'firebase/app';
// import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDdklRLWgGr1hvQTAHgDeconA4D19ZWftM",
  authDomain: "around-a86ff.firebaseapp.com",
  databaseURL: "https://around-a86ff.firebaseio.com",
  projectId: "around-a86ff",
  storageBucket: "around-a86ff.appspot.com",
  messagingSenderId: "958820447540",
  appId: "1:958820447540:web:0b601e35e8b1a405642161"
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const firestore = firebase.firestore();
export const storage = app.storage();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
