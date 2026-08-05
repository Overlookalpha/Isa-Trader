// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

// Firebase Auth
import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

// Firebase Firestore
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyBijFka-NicMl5ayI7dBIGQsPDU1MLnGP8",
  authDomain: "isatrader-d4602.firebaseapp.com",
  projectId: "isatrader-d4602",
  storageBucket: "isatrader-d4602.firebasestorage.app",
  messagingSenderId: "934093480244",
  appId: "1:934093480244:web:ec22b3c7b7d9f2d81b8561"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
