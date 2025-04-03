import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { HashLink } from "react-router-hash-link";
import SocialLink from "../SocialLink";
const Footer = ({ setMenu }) => {
    const UsefulLink = ({ to, children }) => {
        return (
            <p>
                <HashLink
                    to={"/" + to + "#"}
                    smooth
                    onClick={() => setMenu(to === "" ? "home" : to)}>
                    {children}
                </HashLink>
            </p>
        );
    };

    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <img src={assets.footer_logo_erox} alt="" />
                </div>
                <div className="footer-right">
                    <div className="useful-links">
                        <h1>Useful Links</h1>
                        <UsefulLink to="">Home</UsefulLink>
                        <UsefulLink to="about-us">About Us</UsefulLink>
                        <UsefulLink to="services">Services</UsefulLink>
                        <UsefulLink to="contact-us">Contact Us</UsefulLink>
                    </div>
                    <div className="social-links">
                        <SocialLink
                            icon={assets.linkedin_white_social}
                            link="https://www.linkedin.com/company/zeldatech-innovations-pvt-ltd/"
                        />
                        <SocialLink
                            icon={assets.instagram_white_social}
                            link="https://www.instagram.com/zeldatechinnovations"
                        />
                        <SocialLink
                            icon={assets.email_white_social}
                            link="https://www.zeldatech.in/"
                        />
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>
                    Copyright © 2024 Zeldatech Innovations Pvt. Ltd. - All
                    Rights Reserved
                </p>
            </div>
        </div>
    );
};

export default Footer;
