import React from "react";
import "./ContactUs.css";
import { assets } from "../../assets/assets";
import SocialLink from "../../components/SocialLink";
const ContactUs = () => {
    return (
        <div id="contact-us">
            <div id="contact-us-left">
                <div id="contact-us-info">
                    <div>
                        <h1>Contact Us</h1>
                        <p>
                            Email, call or complete the form to know how erox
                            can solve your problems
                        </p>
                    </div>
                    <div>
                        <h2>Customer Support</h2>
                        <p>info.zeldatech@gmail.com</p>
                    </div>
                    <div>
                        <h3>You can also find us here:</h3>
                        <div id="contact-us-info-social">
                            <SocialLink
                                icon={assets.linkedin_blue_social}
                                link="https://www.linkedin.com/company/zeldatech-innovations-pvt-ltd/"
                            />
                            <SocialLink
                                icon={assets.instagram_blue_social}
                                link="https://www.instagram.com/zeldatechinnovations"
                            />
                            <SocialLink
                                icon={assets.email_blue_social}
                                link="https://www.zeldatech.in/"
                            />
                        </div>
                    </div>
                </div>
                <div id="contact-us-illustration">
                    <img src={assets.contactUs_illustration} alt="" />
                </div>
            </div>
            <div id="contact-us-right">
                <form id="contact-us-form">
                    <div id="contact-us-form-heading">
                        <h1>Get in touch</h1>
                        <h3>You can reach us anytime.</h3>
                    </div>
                    <div id="contact-us-form-input">
                        <input
                            type="text"
                            autoComplete="name"
                            placeholder="Enter you name*"
                        />
                        <input
                            type="email"
                            placeholder="Enter you email address*"
                        />
                        <input
                            type="tel"
                            autoComplete="mobile tel"
                            placeholder="Enter you mobile number*"
                        />
                        <textarea
                            name="message"
                            placeholder="How can we help?"></textarea>
                    </div>
                    <button>Submit Feedback</button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
