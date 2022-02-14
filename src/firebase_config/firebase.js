import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
firebase.initializeApp({
  apiKey: "AIzaSyAxRIOmqRtAfgerWyr0YXOoFY_nNUvLVyw",
  authDomain: "realtimechat-643a6.firebaseapp.com",
  projectId: "realtimechat-643a6",
  storageBucket: "realtimechat-643a6.appspot.com",
  messagingSenderId: "858888950669",
  appId: "1:858888950669:web:4322a288c5784f192023c4",
  measurementId: "G-NJ1VC5RSE6",
});
const auth = firebase.auth();
const firestore = firebase.firestore();

export { firebase, auth, firestore };
