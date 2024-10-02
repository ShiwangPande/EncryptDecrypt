// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_wFYHUSkW4fvcwM-w8fFdd5OUKttflxM",
  authDomain: "encryptdecrypt-f8a7a.firebaseapp.com",
  projectId: "encryptdecrypt-f8a7a",
  storageBucket: "encryptdecrypt-f8a7a.appspot.com",
  messagingSenderId: "1016244687550",
  appId: "1:1016244687550:web:94dc0a6779bb5051cb04ef",
  measurementId: "G-7QB1D0S64L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
