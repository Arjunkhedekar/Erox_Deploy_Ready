import React from "react";
import { assets } from "../../../assets/assets";
// import "./FAQItem.css";

const FAQItem = ({ question, answer, isVisible, onClick }) => {
   return (
      <div 
         className="w-full mx-auto mb-2 p-6 md:p-6 bg-[#d1f4ff] rounded cursor-pointer"
         onClick={onClick}
      >
         <h3 className="flex items-center justify-between font-inter text-xl md:text-2xl font-bold">
            <span>{question}</span>
            <img 
               src={assets.dropdown_blue_icon} 
               alt="show answer" 
               className={`w-6 h-6 md:w-6 md:h-6 mr-5 transition-transform duration-200 ${isVisible ? 'transform rotate-180' : ''}`}
            />
         </h3>
         
         {isVisible && (
            <p className="mt-3 font-inter text-base md:text-lg font-normal leading-relaxed text-left">
               {answer}
            </p>
         )}
      </div>
   );
};

export default FAQItem;
