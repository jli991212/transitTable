// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJZ-W8Sr1if_5MPsgaIjJCrQ3nshZZ-oM",
  authDomain: "daily-transit-tool.firebaseapp.com",
  projectId: "daily-transit-tool",
  databaseURL:"https://daily-transit-tool-default-rtdb.firebaseio.com/",
  storageBucket: "daily-transit-tool.appspot.com",
  messagingSenderId: "23523036202",
  appId: "1:23523036202:web:ad1ba0b1147303c9e30753",
  measurementId: "G-936LHPK5HJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
