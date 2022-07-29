import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDez1vRc55klAJpMg_94VQ32UCn2brnt5k",
  authDomain: "coding-ui-3c8af.firebaseapp.com",
  projectId: "coding-ui-3c8af",
  storageBucket: "coding-ui-3c8af.appspot.com",
  messagingSenderId: "383245459906",
  appId: "1:383245459906:web:29604aef5f54935b88f65b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
