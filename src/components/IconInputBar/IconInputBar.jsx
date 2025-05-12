import React, { useState } from "react";
// import "./IconInputBar.css";

const IconInputBar = ({ placeholder, type, icon, toggleIcon }) => {
   const [inputType, setInputType] = useState(type);

   const handleToggle = () => {
      setInputType((prevType) =>
         prevType === "password" ? "text" : "password"
      );
   };

   return (
      <div className="relative w-[70%] h-[50px] mx-auto">
         <input
            type={inputType}
            placeholder={placeholder}
            className="w-full h-full pl-[20px] pr-[50px] border-none rounded-md focus:outline-none placeholder:text-[#858585] placeholder:font-medium"
         />
         <img src={icon} alt="" className="absolute top-1/2 right-[15px] transform -translate-y-1/2" />
         {type === "password" && (
            <img
               src={toggleIcon}
               alt="toggle visibility"
               onClick={handleToggle}
               className="absolute top-1/2 right-[15px] transform -translate-y-1/2 cursor-pointer"
            />
         )}
      </div>
   );
};

export default IconInputBar;

