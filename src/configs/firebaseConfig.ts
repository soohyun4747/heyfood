// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUkGbBaDu0N2R8H_XbhC-MZrkEtOwrrpY",
  authDomain: "heyfood-30435.firebaseapp.com",
  projectId: "heyfood-30435",
  storageBucket: "heyfood-30435.firebasestorage.app",
  messagingSenderId: "20808142380",
  appId: "1:20808142380:web:c08893423e579ed0c48b89",
  measurementId: "G-3XF135PBR8"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, 'heyfood');
export const storage = getStorage(app);