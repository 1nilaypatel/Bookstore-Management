// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "gadgetgrid-by-nilay.firebaseapp.com",
  projectId: "gadgetgrid-by-nilay",
  storageBucket: "gadgetgrid-by-nilay.appspot.com",
  messagingSenderId: "576653193408",
  appId: "1:576653193408:web:57dd984141dd389ed37d25"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);