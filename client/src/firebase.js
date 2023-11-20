// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-mm.firebaseapp.com",
  projectId: "mern-estate-mm",
  storageBucket: "mern-estate-mm.appspot.com",
  messagingSenderId: "1008316865710",
  appId: "1:1008316865710:web:cb71adda8ca7fff194a13f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
