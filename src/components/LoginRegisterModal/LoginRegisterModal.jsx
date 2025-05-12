import React, { useState } from "react";
import { assets } from "../../assets/assets";
// import "./LoginRegisterModal.css";
import IconInputBar from "../IconInputBar/IconInputBar";
import { signIn } from "../../userAuth";
import {useAuth} from '../../utils/AuthContext/index';

const LoginRegisterModal = ({ toggleModal }) => {
   // const { userLoggedIn } = useAuth();

   const [isLogin, setIsLogin] = useState(true);
   const [isSigningIn, setIsSigningIn] = useState(false);

   const toggleLoginRegister = () => {
      setIsLogin(!isLogin);
   };

   const onGoogleSignIn = async(e)=>{
      e.preventDefault();
      if(!isSigningIn){
         setIsSigningIn(true);
         await signIn().catch((error) => {
            console.error("Error signing in with Google: ", error);
            setIsSigningIn(false);
         })
      }
      console.log("Google Sign In Clicked")
   }

   return (
      <div className="fixed inset-0 w-full h-full bg-black/50 bg-opacity-50 flex justify-center items-center z-[1000] px-0 py-[10px]" onClick={toggleModal}>
         <div className="bg-[#dff7ff] rounded-3xl w-full max-w-md flex flex-col items-center gap-5 p-4 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <img
               src={isLogin ? assets.login_image : assets.register_image}
               alt=""
               className="rounded-t-3xl w-full"
            />
            <div className="flex flex-col gap-4 w-full px-4">
               <h1 className="text-center text-2xl font-semibold text-[#0092e4]">{isLogin ? "LOGIN" : "REGISTER"}</h1>
               {!isLogin && (
                  <IconInputBar
                     type={"text"}
                     placeholder={"Enter your name"}
                     icon={assets.user_icon}
                  />
               )}
               <IconInputBar
                  type={"email"}
                  placeholder={"Enter your email address"}
                  icon={assets.email_icon}
               />
               <IconInputBar
                  type={"password"}
                  placeholder={"Enter your password"}
                  icon={assets.password_hide_icon}
                  toggleIcon={assets.password_hide_icon}
               />
               {isLogin && <p className="text-sm text-gray-600 cursor-pointer">Forgot password ?</p>}
               <button className="bg-[#00c2ff] text-white text-lg font-semibold py-3 rounded-md w-1/2 mx-auto">{isLogin ? "LOGIN" : "REGISTER"}</button>
            </div>

            <div className="flex flex-col items-center w-full gap-4 px-4">
               <div className="flex items-center gap-3 w-full max-w-xs">
                  <div className="flex-grow h-px bg-[#00c2ff]" />
                  <span className="text-xs font-medium text-black">OR</span>
                  <div className="flex-grow h-px bg-[#00c2ff]" />
               </div>
               <button
                  onClick={onGoogleSignIn}
                  className="flex items-center justify-center gap-3 border-2 border-[#00c2ff] rounded-full px-6 py-3 w-full max-w-sm text-lg font-medium"
               >
                  <img src={assets.google_logo} alt="" className="w-6 h-6" />
                  Sign in with Google
               </button>

               <p className="text-base text-black font-medium cursor-pointer">
                  {isLogin ? "Create an account?" : "Already registered?"}{" "}
                  <span className="font-semibold underline">
                     {isLogin ? "Sign up" : "Login"}
                  </span>
               </p>
            </div>
         </div>
      </div>
   );
};

export default LoginRegisterModal;