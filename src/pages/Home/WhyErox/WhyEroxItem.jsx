import React from "react";
import "./WhyEroxItem.css";
const WhyEroxItem = ({ icon, title }) => {
   return (
      <div className="why-erox-item">
         <img src={icon} alt="feature icon" />
         <p>{title}</p>
      </div>
   );
};

export default WhyEroxItem;
