import React, { useState } from "react";
import "./ChooseLocation.css";
import { assets } from "../../../../assets/assets";
import ChooseLocationModal from "./ChooseLocationModal";

const ChooseLocation = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const toggleModal = () => setIsModalOpen(!isModalOpen);

   return (
      <div>
         <div id="choose-location" onClick={toggleModal}>
            <img src={assets.location_pin_icon} alt="" />
            <h3>Choose your print location...</h3>
            <img src={assets.dropdown_blue_icon} alt="" />
         </div>
         <ChooseLocationModal
            toggleModal={toggleModal}
            isModalOpen={isModalOpen}
         />
      </div>
   );
};

export default ChooseLocation;
