// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5npudQ5KIO5-YJpr8_0VQ2Gb72EumLY4",
  authDomain: "nexacart-f13db.firebaseapp.com",
  projectId: "nexacart-f13db",
  storageBucket: "nexacart-f13db.appspot.com",
  messagingSenderId: "379790518925",
  appId: "1:379790518925:web:4d3ada77abd2953a5990c4",
  measurementId: "G-TNMQ9KBMEL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
