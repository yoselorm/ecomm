// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5AH7HfPbXvIOh1KmVle1AnLttmYTiQlk",
  authDomain: "dashboard-a913b.firebaseapp.com",
  projectId: "dashboard-a913b",
  storageBucket: "dashboard-a913b.appspot.com",
  messagingSenderId: "271004725495",
  appId: "1:271004725495:web:e7786771da05f10762e3f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)