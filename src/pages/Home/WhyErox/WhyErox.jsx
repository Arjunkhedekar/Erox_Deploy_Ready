import React from "react";
import { assets } from "../../../assets/assets";
// import "./WhyErox.css";
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
      <div className="relative flex flex-col items-center my-[200px] mb-[100px] p-5 gap-12">
         <h1 className="font-inter text-4xl md:text-[50px] font-bold text-[#1b1b1b]">
            WHY <span className="text-[#0092e4]">EroxPrints?</span>
         </h1>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-[80%] md:w-[92%] mx-auto">
            {whyEroxList.map((item, index) => (
               <WhyEroxItem key={index} icon={item.icon} title={item.title} />
            ))}
         </div>
         
         <img 
            src={assets.home_blob_whyerox} 
            alt="Decorative blob background" 
            className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 w-[400px] md:w-auto"
         />
      </div>
   );
};

export default WhyErox;
