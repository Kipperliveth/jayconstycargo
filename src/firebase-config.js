// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0f9-Q_bfcw_14PF7wg_1nlyVb_M0d7Wk",
  authDomain: "jayconstycargo-db719.firebaseapp.com",
  projectId: "jayconstycargo-db719",
  storageBucket: "jayconstycargo-db719.firebasestorage.app",
  messagingSenderId: "458911372590",
  appId: "1:458911372590:web:4e181bc9bb705731f7d6bf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const txtdb = getFirestore(app);