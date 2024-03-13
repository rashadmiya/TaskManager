// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs3qUsMUFFJTIiE-Y7yD-FkUTL2S93sN0",
  authDomain: "taskmanager-a44b0.firebaseapp.com",
  projectId: "taskmanager-a44b0",
  storageBucket: "taskmanager-a44b0.appspot.com",
  messagingSenderId: "937897482414",
  appId: "1:937897482414:web:ac638cc1611a8678c4b53f"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);