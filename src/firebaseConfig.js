// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);