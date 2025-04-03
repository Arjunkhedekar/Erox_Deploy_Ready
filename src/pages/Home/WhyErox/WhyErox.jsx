import React from "react";
import { assets } from "../../../assets/assets";
import "./WhyErox.css";
import WhyEroxItem from "./WhyEroxItem";

const WhyErox = () => {
   const whyEroxList = [
      {
         icon: assets.whyErox_fastWay,
         title: "A fast and efficient way to take printouts",
      },
      {
         icon: assets.whyErox_centralizedPlatform,
         title: "Centralized printing store connection platform",
      },
      {
         icon: assets.whyErox_24hrService,
         title: "24hr printing service",
      },
      {
         icon: assets.whyErox_securePrintouts,
         title: "Secure printouts without privacy concerns",
      },
      {
         icon: assets.whyErox_timeAndDistance,
         title: "Printing time and travel distance estimation",
      },
      {
         icon: assets.whyErox_homeDelivery,
         title: "Home delivery for bulk printing",
      },
   ];

   return (
      <div id="why-erox-section">
         <h1>
            WHY <span>EroxPrints?</span>
         </h1>
         <div id="why-erox-items">
            {whyEroxList.map((item, index) => (
               <WhyEroxItem key={index} icon={item.icon} title={item.title} />
            ))}
         </div>
         <img src={assets.home_blob_whyerox} alt="" id="home-blob-whyerox" />
      </div>
   );
};

export default WhyErox;
