// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, Firestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAFSDHZtbikCUQG_ARaM5Y3FDz7eNcc5w",
  authDomain: "aesura-bec67.firebaseapp.com",
  projectId: "aesura-bec67",
  storageBucket: "aesura-bec67.appspot.com",
  messagingSenderId: "492866098858",
  appId: "1:492866098858:web:193dc527345b8e65b3e2d3",
  measurementId: "G-E712L0CT47"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get Firestore instance
export const db: Firestore = getFirestore(firebaseApp);
