import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  setLogLevel,
  enableIndexedDbPersistence,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCm2r-kjQzETRZQDJ6XUAmzB5ErXvpLO4E",
  authDomain: "intervai-77810.firebaseapp.com",
  projectId: "intervai-77810",
  storageBucket: "intervai-77810.firebasestorage.app",
  messagingSenderId: "412029423014",
  appId: "1:412029423014:web:bebb71409171b9c11e1367",
  measurementId: "G-BWSHZQTPNL",
};

// ✅ Initialize app safely (no duplicates)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// 🔇 Silence Firestore connectivity warnings (THIS FIXES YOUR ERROR)
setLogLevel("silent");

// 💾 Enable offline persistence safely (optional but recommended)
enableIndexedDbPersistence(db).catch(() => {
  // ignore multiple-tab or unsupported browser errors
});
