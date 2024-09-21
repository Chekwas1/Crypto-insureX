import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJudteZnXA0_MMF4ealsgDUbE8n610CNU",
  authDomain: "insurex-61a22.firebaseapp.com",
  projectId: "insurex-61a22",
  storageBucket: "insurex-61a22.appspot.com",
  messagingSenderId: "26509406032",
  appId: "1:26509406032:web:5c87ef183345f123434655",
  measurementId: "G-W4P2V1BL9K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
