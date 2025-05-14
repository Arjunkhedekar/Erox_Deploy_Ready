import React from "react";
// import "./Footer.css";
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
          onClick={() => setMenu(to === "" ? "home" : to)}
          className="font-inter text-lg font-normal"
        >
          {children}
        </HashLink>
      </p>
    )
  }

  return (
    <div className="relative bottom-0 w-full flex flex-col justify-end gap-12 py-5 px-7 md:px-8 bg-[#00c2ff]">
      <div className="flex flex-col md:flex-row justify-around items-center gap-5 md:gap-0">
        <div className="footer-left">
          <img src={assets.footer_logo_erox || "/placeholder.svg"} alt="Erox Logo" />
        </div>
        <div className="flex flex-col md:flex-row justify-around items-center gap-5 md:gap-[300px]">
          <div className="hidden md:flex flex-col gap-5">
            <h1 className="font-inter text-2xl font-bold">Useful Links</h1>
            <UsefulLink to="">Home</UsefulLink>
            <UsefulLink to="about-us">About Us</UsefulLink>
            <UsefulLink to="services">Services</UsefulLink>
            <UsefulLink to="contact-us">Contact Us</UsefulLink>
          </div>
          <div className="flex flex-row md:flex-col items-center gap-5">
            <SocialLink
              icon={assets.linkedin_white_social}
              link="https://www.linkedin.com/company/zeldatech-innovations-pvt-ltd/"
            />
            <SocialLink icon={assets.instagram_white_social} link="https://www.instagram.com/zeldatechinnovations" />
            <SocialLink icon={assets.email_white_social} link="https://www.zeldatech.in/" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="text-center font-inter text-base font-normal text-white">
          Copyright © 2024 Zeldatech Innovations Pvt. Ltd. - All Rights Reserved
        </p>
      </div>
    </div>
  )
}

export default Footer;
