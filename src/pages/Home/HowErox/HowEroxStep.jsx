import React from "react";
// import "./HowEroxStep.css";
const HowEroxStep = ({ title, description, className }) => {
   return (
     <div className={`flex flex-col w-full items-start text-start ${className}`}>
       <h3 className="font-inter text-2xl md:text-3xl font-extrabold text-white">{title}</h3>
       <p className="mt-1 md:mt-0.5 font-inter text-base md:text-lg font-medium text-white">{description}</p>
     </div>
   )
 }

export default HowEroxStep;
