// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmVne1Qm0t_AROLh83f2txmjqlKRRc5oM",
  authDomain: "first-hackathon-ecommerce.firebaseapp.com",
  projectId: "first-hackathon-ecommerce",
  storageBucket: "first-hackathon-ecommerce.appspot.com",
  messagingSenderId: "728593839177",
  appId: "1:728593839177:web:140a3c3ce46156938efb98",
  measurementId: "G-Y7PMST0GZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const storage=getStorage(app)

export {storage}