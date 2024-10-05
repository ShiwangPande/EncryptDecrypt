// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmzNWzP1MKuVVQ4miAWiQQjoQvwQHKjdk",
  authDomain: "digital-right-management.firebaseapp.com",
  projectId: "digital-right-management",
  storageBucket: "digital-right-management.appspot.com",
  messagingSenderId: "945717893504",
  appId: "1:945717893504:web:b4826ae753d801955bc965",
  measurementId: "G-KTSFL2QVMV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { app, auth };
