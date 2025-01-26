// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-estate-5a5c9.firebaseapp.com",
    projectId: "mern-estate-5a5c9",
    storageBucket: "mern-estate-5a5c9.firebasestorage.app",
    messagingSenderId: "1021075786501",
    appId: "1:1021075786501:web:350f6d07e20769de54c56c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);