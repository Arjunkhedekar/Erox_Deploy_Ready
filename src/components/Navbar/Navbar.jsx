import React, { useState, useEffect } from "react";
// import "./Navbar.css";
import { assets } from "../../assets/assets";
import { HashLink } from "react-router-hash-link";
import LoginRegisterModal from "../LoginRegisterModal/LoginRegisterModal";
import { auth, signIn } from "../../userAuth";
import { signOut } from "firebase/auth";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const Navbar = ({ setMenu, menu }) => {
    const [scroll, setScroll] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginRegisterModal, setShowLoginRegisterModal] = useState(false);
    const [user, setUser] = useState(localStorage.getItem("user") || null);

    const checkLogin = async () => {
        if (!user) {
            await signIn()
                .then(async (details) => {
                    console.log(details);
                    localStorage.setItem("user", details.user.uid);
                    
                    try {
                        await setDoc(doc(db, "users", details.user.uid), {
                            uid: details.user.uid,
                            email: details.user.email,
                            createdAt: new Date().toISOString(),
                            lastLogin: new Date().toISOString()
                        });
                        console.log("User document created successfully");
                    } catch (error) {
                        console.error("Error creating user document:", error);
                    }
                    
                    setUser(details.user.uid);
                })
                .catch((e) => console.log(e));
            return;
        }
    };

    useEffect(() => {
        checkLogin();
        // Add auth state listener
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setIsLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup listener
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const NavLink = ({ to, children }) => {
        return (
            <li
                className={
                    menu === (to === "" ? "home" : to)
                        ? "border-b-3 border-[#00c2ff] pb-0.5"
                        : ""
                }>
                <HashLink
                    to={`/${to}#`}
                    smooth
                    onClick={() => setMenu(to === "" ? "home" : to)}
                    className="font-inter text-base font-medium">
                    {children}
                </HashLink>
            </li>
        );
    };

    const toggleLoginRegisterModal = () => {
        setShowLoginRegisterModal(!showLoginRegisterModal);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsLoggedIn(false);
            localStorage.removeItem("user");
            localStorage.removeItem("orderIdNo");
            setUser(null);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div
            id="navbar"
            className={`sticky top-0 z-[10] flex justify-between items-center px-5 py-2.5 transition-all duration-300 ease-in-out ${
                scroll
                    ? "bg-white/40 backdrop-blur-md shadow-md"
                    : "bg-transparent"
            }`}>
            <HashLink to="/#" smooth onClick={() => setMenu("home")}>
                <img
                    src={assets.navbar_logo_erox || "/placeholder.svg"}
                    alt="logo"
                />
            </HashLink>
            <div className="flex items-center gap-5 md:gap-12">
                <div className="flex items-center">
                    {!user ? (
                        <button
                            className="bg-[#00c2ff] text-white font-inter text-lg font-semibold py-2.5 px-7 rounded-lg"
                            onClick={checkLogin}>
                            LOGIN
                        </button>
                    ) : (
                        <button
                            className="bg-[#dc2f02] text-white font-inter text-lg font-semibold py-2.5 px-7 rounded-lg"
                            onClick={handleLogout}>
                            LOGOUT
                        </button>
                    )}
                </div>
                <div
                    className="flex flex-col justify-center cursor-pointer md:hidden"
                    onClick={toggleMenu}>
                    <span
                        className={`block w-6 h-0.5 bg-black my-0.5 transition-all ${
                            isOpen ? "transform rotate-45 translate-y-2" : ""
                        }`}></span>
                    <span
                        className={`block w-6 h-0.5 bg-black my-0.5 transition-all ${
                            isOpen ? "opacity-0" : ""
                        }`}></span>
                    <span
                        className={`block w-6 h-0.5 bg-black my-0.5 transition-all ${
                            isOpen ? "transform -rotate-45 -translate-y-2" : ""
                        }`}></span>
                </div>
                <div
                    className={`fixed md:static top-[70px] left-0 w-full md:w-auto flex flex-col md:flex-row items-center gap-0 md:gap-14 bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300 ${
                        isOpen ? "left-0" : "left-[-100%]"
                    } md:left-0`}
                    id="navbar-right">
                    <ul className="flex flex-col md:flex-row gap-14 md:gap-14 list-none p-5 md:p-0 w-full md:w-auto">
                        <NavLink to="">HOME</NavLink>
                        <NavLink to="about-us">ABOUT US</NavLink>
                        <NavLink to="services">SERVICES</NavLink>
                        <NavLink to="contact-us">CONTACT US</NavLink>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
