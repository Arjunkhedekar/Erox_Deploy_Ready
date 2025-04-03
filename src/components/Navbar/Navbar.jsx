import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { HashLink } from "react-router-hash-link";
import LoginRegisterModal from "../LoginRegisterModal/LoginRegisterModal";

const Navbar = ({ setMenu, menu }) => {
    const [scroll, setScroll] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
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

    const [showLoginRegisterModal, setShowLoginRegisterModal] = useState(false);
    const toggleLoginRegisterModal = () => {
        setShowLoginRegisterModal(!showLoginRegisterModal);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div id="navbar" className={scroll ? "scrolled" : ""}>
            <HashLink to="/#" smooth onClick={() => setMenu("home")}>
                <img src={assets.navbar_logo_erox} alt="logo" />
            </HashLink>
            <div className="navbar-content">
                <div id="navbar-btn">
                    <button onClick={toggleLoginRegisterModal}>LOGIN</button>
                    {showLoginRegisterModal && (
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
