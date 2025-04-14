import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { app } from "./firebase";

const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

export const signIn = async() => {
    const user = await signInWithPopup(auth, provider)   
    localStorage.setItem("user", JSON.stringify(user.user.uid));
    return user;
}; 

export function userLogout() {
    signOut(auth);
}