import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/main.scss'
import './assets/responsive.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { VueFire } from 'vuefire';


import App from './App.vue'
import router from './router'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

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
const firebase = initializeApp(firebaseConfig);

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(VueFire, {
  // imported above but could also just be created here
  firebase,
  modules: [],
} as any);

app.mount('#app')
