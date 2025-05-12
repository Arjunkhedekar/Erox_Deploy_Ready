import React from "react";
// import "./ContactUs.css";
import { assets } from "../../assets/assets";
import SocialLink from "../../components/SocialLink";
const ContactUs = () => {
    return (
        <div className="flex flex-col md:flex-row justify-start md:gap-[10%] mt-[50px] md:mt-[100px] md:h-[150vh]"> {/* #contact-us */}
        <div className="flex flex-col h-full"> {/* #contact-us-left */}
          <div className="flex flex-col justify-center w-[92%] md:w-[55%] ml-0 md:ml-[14%]"> {/* #contact-us-info */}
            <div>
              <h1 className="font-[Montserrat] text-[46px] md:text-[44px] font-bold">Contact Us</h1>
              <p className="mt-1 md:mt-2 text-[14px] font-normal text-[#616566]">
                Email, call or complete the form to know how Erox can solve your problems
              </p>
            </div>
            <div>
              <h2 className="mt-6 md:mt-6 text-underline underline-offset-5 text-[20px] font-[Inter] font-medium">Customer Support</h2>
              <p className="mt-3 md:mt-4 text-[14px] font-normal font-[Inter]">info.zeldatech@gmail.com</p>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-8 mt-5 md:mt-6"> {/* #contact-us-info > div:nth-of-type(3) */}
              <h3 className="text-[16px] font-medium font-[Poppins]">You can also find us here:</h3>
              <div className="flex gap-2 items-center"> {/* #contact-us-info-social */}
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
          <div className="relative h-[80vw] md:h-auto"> {/* #contact-us-illustration */}
            <img
              className="absolute top-0 left-0 z-[-1] transform -translate-x-[27%] -translate-y-[10%] md:transform-none md:translate-x-0 md:translate-y-0 w-[400px] md:w-auto"
              src={assets.contactUs_illustration}
              alt="Contact Us Illustration"
            />
          </div>
        </div>
        <div className="w-full md:w-[40%] h-full px-[30px] md:px-0"> {/* #contact-us-right */}
          <form className="flex flex-col gap-[40px] w-full h-full"> {/* #contact-us-form */}
            <div className="text-center md:text-left"> {/* #contact-us-form-heading */}
              <h1 className="font-[Poppins] text-[44px] font-bold">Get in touch</h1>
              <h3 className="font-[Poppins] text-[22px] font-medium">You can reach us anytime.</h3>
            </div>
            <div className="flex flex-col gap-[40px] w-full"> {/* #contact-us-form-input */}
              <input
                type="text"
                autoComplete="name"
                placeholder="Enter your name*"
                className="w-full p-[16px] text-[16px] bg-[#c2f0ff] border-none rounded-[7px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] font-[Inter] font-normal"
              />
              <input
                type="email"
                placeholder="Enter your email address*"
                className="w-full p-[16px] text-[16px] bg-[#c2f0ff] border-none rounded-[7px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] font-[Inter] font-normal"
              />
              <input
                type="tel"
                autoComplete="mobile tel"
                placeholder="Enter your mobile number*"
                className="w-full p-[16px] text-[16px] bg-[#c2f0ff] border-none rounded-[7px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] font-[Inter] font-normal"
              />
              <textarea
                name="message"
                placeholder="How can we help?"
                className="resize-none w-full h-[200px] p-[15px] text-[20px] bg-[#ffffff] border-[1px] border-[#000000] rounded-[8px] font-[Inter] font-normal"
              ></textarea>
            </div>
            <button className="self-center w-[38%] p-[12px_38px] bg-[#152636] text-[14px] text-white font-[Poppins] font-medium rounded-[15px] border-none">Submit Feedback</button>
          </form>
        </div>
      </div>
    );
};

export default ContactUs;
