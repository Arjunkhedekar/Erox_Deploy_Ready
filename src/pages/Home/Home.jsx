import React from "react";
import "./Home.css";
import { assets } from "../../assets/assets";
import FAQs from "./FAQs/FAQs";
import WhyErox from "./WhyErox/WhyErox";
import PrintWithTechnology from "./PrintWithTechnology/PrintWithTechnology";
import HowErox from "./HowErox/HowErox";
import MainSection from "./MainSection/MainSection";
const Home = () => {
   return (
      <>
         <div id="home">
            <img src={assets.home_blob_navbar} alt="" id="home-blob-navbar" />
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
