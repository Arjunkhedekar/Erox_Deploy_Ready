import React, { useState } from "react";
import "./IconInputBar.css";

const IconInputBar = ({ placeholder, type, icon, toggleIcon }) => {
   const [inputType, setInputType] = useState(type);

   const handleToggle = () => {
      setInputType((prevType) =>
         prevType === "password" ? "text" : "password"
      );
   };

   return (
      <div className="icon-input-bar">
         <input type={inputType} placeholder={placeholder} />
         <img src={icon} alt="" />
         {type === "password" && (
            <img
               src={toggleIcon}
               alt="toggle visibility"
               onClick={handleToggle}
               className="toggle-icon"
            />
         )}
      </div>
   );
};

export default IconInputBar;
