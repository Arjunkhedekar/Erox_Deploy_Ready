import React from "react";
import "./HowEroxStep.css";
const HowEroxStep = ({ title, description }) => {
   return (
      <div className="how-erox-step">
         <h3>{title}</h3>
         <p>{description}</p>
      </div>
   );
};

export default HowEroxStep;
