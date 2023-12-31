// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpMjyt83Ag9iUmfVRLe5G1h5AVmJmpTyg",
  authDomain: "ytmusic-2e8f3.firebaseapp.com",
  databaseURL: "https://ytmusic-2e8f3-default-rtdb.firebaseio.com",
  projectId: "ytmusic-2e8f3",
  storageBucket: "ytmusic-2e8f3.appspot.com",
  messagingSenderId: "50096351635",
  appId: "1:50096351635:web:67554c744b32df94eb2066",
  measurementId: "G-879PZJJ652"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();