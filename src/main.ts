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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
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
