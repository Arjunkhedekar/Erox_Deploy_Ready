
import {getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase";

const provider = new GoogleAuthProvider();
export const auth = getAuth(app); 

export const signIn = () => {
 signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
 }

export function userLogout() {
 signOut(auth);
} 

