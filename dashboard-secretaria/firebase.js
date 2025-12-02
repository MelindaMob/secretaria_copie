// Import Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Ton vrai config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCf-GaeXjUfnPr3dhlh6rnZvUG909OrCdg",
  authDomain: "secretar-ia-2cbee.firebaseapp.com",
  projectId: "secretar-ia-2cbee",
  storageBucket: "secretar-ia-2cbee.firebasestorage.app",
  messagingSenderId: "866530412830",
  appId: "1:866530412830:web:ad61498df06e98aa07210f",
    measurementId: "G-DPM55C5ZX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth + DB
export const auth = getAuth(app);
export const db = getFirestore(app);