import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkWE7z7Ygi_46I-bgmJ_l-CcZIB_cVlfU",
  authDomain: "mindheroes-bded5.firebaseapp.com",
  projectId: "mindheroes-bded5",
  storageBucket: "mindheroes-bded5.firebasestorage.app",
  messagingSenderId: "235473793630",
  appId: "1:235473793630:web:22b9060c5fa558607c3acf",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // Authentication
export const db = getFirestore(app); // Database (Firestore)
