import React from "react";
// import "./Home.css";
import { assets } from "../../assets/assets";
import FAQs from "./FAQs/FAQs";
import WhyErox from "./WhyErox/WhyErox";
import PrintWithTechnology from "./PrintWithTechnology/PrintWithTechnology";
import HowErox from "./HowErox/HowErox";
import MainSection from "./MainSection/MainSection";
const Home = () => {
    return (
        <>
            <div id="home" className="relative">
                <img
                    src={assets.home_blob_navbar || "/placeholder.svg"}
                    alt="Decorative blob"
                    className="absolute top-0 right-0 z-[-1]"
                />
                <MainSection />
                <PrintWithTechnology />
                <WhyErox />
                <HowErox />
                <FAQs />
            </div>
        </>
    );
};

export default Home;
