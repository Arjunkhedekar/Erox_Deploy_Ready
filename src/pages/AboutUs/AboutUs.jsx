import React from "react";
// import "./AboutUs.css";
import { assets } from "../../assets/assets";
const AboutUs = () => {
    return (
        <div id="about-us">
            <div className="relative w-full md:h-[100vh] h-auto md:mt-[5%] mt-[3%] md:pl-[5%] pl-[5%] overflow-hidden">
                <div className="md:w-[50%] w-[100%] md:mt-[30px] mt-[20px]">
                    <h1 className="font-['Inter'] md:text-[96px] text-[70px] font-semibold">
                        About Us
                    </h1>
                    <p className="mt-[30px] font-['Poppins'] md:text-[26px] text-[16px] mb-20 font-normal text-[#152636]">
                        EROX is a centralized platform for any user in wish to
                        take printouts, enabling a satisfactorily fast and easy
                        experience by incorporating the client-server service
                        where in a user in dire need of prints can send his/her
                        copy of online document to the printing store of choice
                        or be able to choose the nearest and fastest available
                        store there is at the moment leaving behind the kind of
                        feeling of fulfilment the user seeks. The merchants
                        opting EROX as their go-to online service for printing
                        have an exposure opportunity to flash their store as an
                        e-commerce platform and expanding the scale of number of
                        satisfactory customer they deal with without the
                        presence of EROX.
                    </p>
                </div>
                <img
                    src={assets.aboutUs_illustration || "/placeholder.svg"}
                    alt=""
                    id="about-us-illustration"
                    className="absolute md:top-0 md:right-0 md:transform md:translate-x-[30%] md:translate-y-[-10%] md:overflow-hidden
                     top-[42%] right-0 z-[-1] w-[600px] transform translate-x-[30%] translate-y-[-10%] overflow-hidden"
                />
            </div>
            <div className="p-[4%] ] bg-[#152636]">
                <h1 className="text-center font-['Inter'] text-[64px] font-medium text-white">
                    Team
                </h1>
                <div className="md:flex md:flex-row flex-col justify-around items-center gap-[40px] w-full py-[50px_0_30px_0]">
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
            <div className="md:flex md:flex-row flex-col md:justify-between items-center md:h-[50vh] h-[60vh] w-full p-[50px_10%] md:gap-0 gap-[10px]">
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
        <div className="flex flex-col items-center gap-[50px]">
            <img src={image || "/placeholder.svg"} alt="" />
            <div className="text-center">
                <h1 className="text-center font-['Inter'] text-[38px] font-medium text-white">
                    {name}
                </h1>
                <h3 className="text-center font-['Inter'] text-[24px] font-medium text-white">
                    {role}
                </h3>
            </div>
        </div>
    );
};

const ContactDetail = ({ icon, heading, info }) => {
    return (
        <div className="flex flex-col items-center gap-[20px] my-10 md:max-w-[20%] max-w-[80%] md:m-0 m-[0_auto] p-auto">
            <div className="flex gap-[10px]">
                <img
                    src={icon || "/placeholder.svg"}
                    alt=""
                    className="w-[30px] h-[30px]"
                />
                <h1 className="text-center font-['Inter'] text-[24px] font-bold">
                    {heading}
                </h1>
            </div>
            <p className="text-center font-['Poppins'] text-[16px] font-normal break-words">
                {info}
            </p>
        </div>
    );
};

export default AboutUs;
