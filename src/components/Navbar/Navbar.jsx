import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { HashLink } from "react-router-hash-link";
import LoginRegisterModal from "../LoginRegisterModal/LoginRegisterModal";
import { auth } from "../../userAuth";
import { signOut } from "firebase/auth";


const Navbar = ({ setMenu, menu }) => {
    const [scroll, setScroll] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginRegisterModal, setShowLoginRegisterModal] = useState(false);

    useEffect(() => {
        // Add auth state listener
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setIsLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, []);

    const NavLink = ({ to, children }) => {
        return (
            <li
                id={
                    menu === (to === "" ? "home" : to)
                        ? "active-navbar-link"
                        : ""
                }>
                <HashLink
                    to={`/${to}#`}
                    smooth
                    onClick={() => setMenu(to === "" ? "home" : to)}>
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
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div id="navbar" className={scroll ? "scrolled" : ""}>
            <HashLink to="/#" smooth onClick={() => setMenu("home")}>
                <img src={assets.navbar_logo_erox} alt="logo" />
            </HashLink>
            <div className="navbar-content">
                <div id="navbar-btn">
                    {isLoggedIn ? (
                        <button className="logout-btn" onClick={handleLogout}>
                            LOGOUT
                        </button>
                    ) : (
                        <button onClick={toggleLoginRegisterModal}>
                            LOGIN
                        </button>
                    )}
                    {showLoginRegisterModal && !isLoggedIn && (
                        <LoginRegisterModal
                            toggleModal={toggleLoginRegisterModal}
                        />
                    )}
                </div>
                <div className="hamburger" onClick={toggleMenu}>
                    <span className={`bar ${isOpen ? "open" : ""}`}></span>
                    <span className={`bar ${isOpen ? "open" : ""}`}></span>
                    <span className={`bar ${isOpen ? "open" : ""}`}></span>
                </div>
                <div id="navbar-right" className={isOpen ? "open" : ""}>
                    <ul id="navbar-menu">
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
