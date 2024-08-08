
import { GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore,getDocs } from "firebase/firestore"
export const provider = new GoogleAuthProvider();




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-9N41UIPZ_jcpryKbuUV5zfvhv4gRzIA",
  authDomain: "ecotablas-431f9.firebaseapp.com",
  projectId: "ecotablas-431f9",
  storageBucket: "ecotablas-431f9.appspot.com",
  messagingSenderId: "23822027339",
  appId: "1:23822027339:web:56662cd372a8a61af31bce"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Auth instance
export const auth = getAuth(app);
export const db=getFirestore(app);