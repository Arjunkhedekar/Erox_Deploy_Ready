import React from "react";
import "./AboutUs.css";
import { assets } from "../../assets/assets";
const AboutUs = () => {
   return (
      <div id="about-us">
         <div id="about-us-info">
            <div>
               <h1>About Us</h1>
               <p>
                  EROX is a centralized platform for any user in wish to take
                  printouts, enabling a satisfactorily fast and easy experience
                  by incorporating the client-server service where in a user in
                  dire need of prints can send his/her copy of online document
                  to the printing store of choice or be able to choose the
                  nearest and fastest available store there is at the moment
                  leaving behind the kind of feeling of fulfilment the user
                  seeks. The merchants opting EROX as their go-to online service
                  for printing have an exposure opportunity to flash their store
                  as an e-commerce platform and expanding the scale of number of
                  satisfactory customer they deal with without the presence of
                  EROX.
               </p>
            </div>
            <img
               src={assets.aboutUs_illustration}
               alt=""
               id="about-us-illustration"
            />
         </div>
         <div id="about-us-team">
            <h1>Team</h1>
            <div id="team-members">
               <TeamMember
                  name="Tej Shiralkar"
                  role="Co-founder & CEO"
                  image={assets.tej_shiralkar}
               />
               <TeamMember
                  name="Arjun Khedekar"
                  role="Co-founder & CTO"
                  image={assets.arjun_khedekar}
               />
            </div>
         </div>
         <div id="about-us-contacts">
            <ContactDetail
               icon={assets.location_pin_icon}
               heading={"Address"}
               info={
                  "H NO 517, NR RADHAKRISHNA MANDIR, Kagal, Kolhapur, Maharashtra, 416216"
               }
            />
            <ContactDetail
               icon={assets.phone_icon}
               heading={"Contact Number"}
               info={"+91 8999080707"}
            />
            <ContactDetail
               icon={assets.email_icon}
               heading={"Email"}
               info={"info.zeldatech@gmail.com"}
            />
         </div>
      </div>
   );
};

const TeamMember = ({ name, role, image }) => {
   return (
      <div className="team-member">
         <img src={image} alt="" />
         <div className="team-member-info">
            <h1>{name}</h1>
            <h3>{role}</h3>
         </div>
      </div>
   );
};

const ContactDetail = ({ icon, heading, info }) => {
   return (
      <div className="contact-detail">
         <div>
            <img src={icon} alt="" />
            <h1>{heading}</h1>
         </div>
         <p>{info}</p>
      </div>
   );
};

export default AboutUs;
