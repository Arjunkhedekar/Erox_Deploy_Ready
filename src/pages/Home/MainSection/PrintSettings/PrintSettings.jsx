import React, { useState, useEffect, useRef } from "react";
import "./PrintSettings.css";
import { assets } from "../../../../assets/assets";

const PrintSettings = ({ metadata, updateMetadata }) => {
   return (
      <div className="print-settings">
         <div className="print-settings-block">
            <h3>Copies</h3>
            <CopiesCounter 
               value={metadata.copies}
               onChange={count => updateMetadata({ copies: count })}
            />
            <h3>Select Color</h3>
            <ToggleButtonGroup 
               choice1="COLOR" 
               choice2="B&W"
               selected={metadata.color}
               onSelect={color => updateMetadata({ color })}
            />
            <h3>Select Layout</h3>
            <ToggleButtonGroup 
               choice1="Portrait" 
               choice2="Landscape"
               selected={metadata.layout}
               onSelect={layout => updateMetadata({ layout })}
            />
         </div>
         <img
            src={assets.block_divider_line}
            alt=""
            className="block-divider-line"
         />
         <div className="print-settings-block">
            <h3>Paper Size</h3>
            <ToggleButton 
               selected={metadata.paperSize === 'A4'}
               onClick={() => updateMetadata({ paperSize: 'A4' })}
            >
               A4
            </ToggleButton>
            <h3>Select Sides</h3>
            <ToggleButtonGroup 
               choice1="Single Side" 
               choice2="Duplex"
               selected={metadata.sides}
               onSelect={sides => updateMetadata({ sides })}
            />
            <h3>Pages to Print</h3>
            <PagesToPrintDropdown 
               selectedOption={metadata.pagesToPrint}
               customRange={metadata.customRange}
               onSelect={(option, customRange) => 
                  updateMetadata({ 
                     pagesToPrint: option,
                     ...(customRange !== undefined && { customRange })
                  })
               }
            />
         </div>
      </div>
   );
};

export const ToggleButtonGroup = ({ choice1, choice2, selected, onSelect }) => {
   return (
      <div className="toggle-button-group">
         <ToggleButton
            selected={selected === choice1}
            onClick={() => onSelect(choice1)}
         >
            {choice1}
         </ToggleButton>
         <ToggleButton
            selected={selected === choice2}
            onClick={() => onSelect(choice2)}
         >
            {choice2}
         </ToggleButton>
      </div>
   );
};

export const ToggleButton = ({ children, onClick, selected }) => {
   return (
      <button
         className={`toggle-button ${selected ? "selected-toggle-button" : ""}`}
         onClick={onClick}
      >
         {children}
      </button>
   );
};

const CopiesCounter = ({ value, onChange }) => {
   const handleInputChange = (e) => {
      const newValue = parseInt(e.target.value, 10);
      if (!isNaN(newValue) && newValue > 0) {
         onChange(newValue);
      }
   };

   return (
      <div className="copies-counter">
         <button onClick={() => value > 1 && onChange(value - 1)}>-</button>
         <input
            type="text"
            value={value}
            onChange={handleInputChange}
         />
         <button onClick={() => onChange(value + 1)}>+</button>
      </div>
   );
};

const PagesToPrintDropdown = ({ selectedOption, customRange, onSelect }) => {
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef(null);

   useEffect(() => {
      if (isOpen) {
         dropdownRef.current.style.height = `${dropdownRef.current.scrollHeight}px`;
      } else {
         dropdownRef.current.style.height = "0px";
      }
   }, [isOpen]);

   const options = [
      "All Pages",
      "First Page Only",
      "Even Pages Only",
      "Odd Pages Only",
      "Custom Range",
   ];

   return (
      <div className="pages-to-print-dropdown">
         <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
            {selectedOption}{" "}
            <img
               src={assets.dropdown_small_icon}
               alt=""
               className={isOpen ? "open" : ""}
            />
         </button>
         {selectedOption === "Custom Range" && (
            <input
               type="text"
               value={customRange}
               onChange={(e) => onSelect("Custom Range", e.target.value)}
               placeholder="e.g. 1-5, 7-9"
               className="custom-range-input"
            />
         )}
         <ul
            ref={dropdownRef}
            className={`dropdown-menu ${isOpen ? "open" : ""}`}
         >
            {options.map((option) => (
               <li
                  key={option}
                  className="dropdown-item"
                  onClick={() => {
                     onSelect(option);
                     setIsOpen(false);
                  }}
               >
                  {option}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default PrintSettings;