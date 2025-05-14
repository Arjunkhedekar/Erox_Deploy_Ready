import React from "react";
// import "./WhyEroxItem.css";
const WhyEroxItem = ({ icon, title }) => {
   return (
      <div className="flex flex-col items-center w-[80%] mx-auto">
         <img 
            src={icon} 
            alt="feature icon" 
            className="h-[90px] md:h-[90px] mb-4"
         />
         <p className="text-center font-inter text-2xl md:text-[28px]">
            {title}
         </p>
      </div>
   );
};

export default WhyEroxItem;
