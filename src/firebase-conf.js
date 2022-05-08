
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0MQoOrnTfylyw5YewfPxoyWHLfNlbX1w",
  authDomain: "creatovantag.firebaseapp.com",
  databaseURL: "https://creatovantag-default-rtdb.firebaseio.com",
  projectId: "creatovantag",
  storageBucket: "creatovantag.appspot.com",
  messagingSenderId: "373192008421",
  appId: "1:373192008421:web:c86a22cb29c24844946a0c",
  measurementId: "G-MPXXSJ7S7Q"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
