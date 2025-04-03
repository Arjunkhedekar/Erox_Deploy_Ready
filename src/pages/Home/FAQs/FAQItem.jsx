import React from "react";
import { assets } from "../../../assets/assets";
import "./FAQItem.css";

const FAQItem = ({ question, answer, isVisible, onClick }) => {
   return (
      <div className="faq-item" onClick={onClick}>
         <h3>
            {question}
            <img src={assets.dropdown_blue_icon} alt="show answer" />
         </h3>
         {isVisible && <p>{answer}</p>}
      </div>
   );
};

export default FAQItem;
