// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VUE_FIREBASE_API_KEY,
  authDomain: "fir-project-f8a27.firebaseapp.com",
  projectId: "fir-project-f8a27",
  storageBucket: "fir-project-f8a27.appspot.com",
  messagingSenderId: "1004462718809",
  appId: "1:1004462718809:web:b6b42a60c2a7c595529648"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)