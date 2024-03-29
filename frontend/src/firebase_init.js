// Firebase config ->
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9ZOtfSr2yhOTzi5uXo_CFh-vdr5YJnr8",
    authDomain: "auth-blockchain-218ca.firebaseapp.com",
    projectId: "auth-blockchain-218ca",
    storageBucket: "auth-blockchain-218ca.appspot.com",
    messagingSenderId: "466912573004",
    appId: "1:466912573004:web:177655871e39a2686366e9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
