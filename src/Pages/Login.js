import React from "react";
import GoogleButton from "react-google-button";
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import {auth} from "../firebase_config/firebase"
function Login() {
  
  const clickHandler = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
  };
  return (
    <div className="button_container">
      <GoogleButton onClick={clickHandler} />
    </div>
  );
}

export default Login;
