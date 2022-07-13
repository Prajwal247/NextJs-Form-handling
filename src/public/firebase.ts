import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDntESkZ0lAAmiIWBL1bnYTn9dnTqhAagw",
    authDomain: "blooddonation-71299.firebaseapp.com",
    projectId: "blooddonation-71299",
    storageBucket: "blooddonation-71299.appspot.com",
    messagingSenderId: "286841770585",
    appId: "1:286841770585:web:a221dd9886af015c575748",
    measurementId: "G-2BRTP0Q8GE"
  };

  const app = initializeApp(firebaseConfig);
  const db=getFirestore();
  const storage=getStorage(app);
  const auth=getAuth();
  
  export {db,app,storage,auth};