
import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

const Login = () => {
  const [loggedInUser,setLoggedInUser]=useContext(UserContext)
  const history=useHistory()
  const location=useLocation()
  const { from } = location.state || { from: { pathname: "/" } };
  if(firebase.apps.length===0){
    firebase.initializeApp(firebaseConfig)
  }
   
    const handleSingIn= () =>{
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var {displayName,email} = result.user;
    const singInUser={name:displayName,email:email}
    setLoggedInUser(singInUser)
    history.replace(from);
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
   console.log(errorCode,errorMessage,email)
  });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleSingIn}>google sing in</button>
        </div>
    );
};

export default Login;