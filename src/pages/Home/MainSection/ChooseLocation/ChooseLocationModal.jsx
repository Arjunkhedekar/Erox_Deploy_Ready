import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./ChooseLocationModal.css";
import { assets } from "../../../../assets/assets";
import IconInputBar from "../../../../components/IconInputBar/IconInputBar";
import {
   disableBodyScroll,
   enableBodyScroll,
} from "../../../../utils/modalUtils";

const ChooseLocationModal = ({ toggleModal, isModalOpen }) => {
   useEffect(() => {
      if (isModalOpen) {
         disableBodyScroll();
      } else {
         enableBodyScroll();
      }
      return () => enableBodyScroll();
   }, [isModalOpen]);

   return (
      <AnimatePresence>
         {isModalOpen && (
            <div className="modal-overlay" onClick={toggleModal}>
               <motion.div
                  key={"location-modal"}
                  initial={{ x: -550 }}
                  animate={{ x: 0 }}
                  exit={{ x: -550 }}
                  transition={{ duration: 0.3, type: "tween" }}
                  className="location-modal"
                  onClick={(e) => e.stopPropagation()}
               >
                  <img
                     src={assets.back_button_circle_icon}
                     alt=""
                     onClick={toggleModal}
                  />
                  <div className="location-options">
                     <IconInputBar
                        type={"text"}
                        placeholder={"Search for colleges, area..."}
                        icon={assets.search_icon}
                     />
                     <div className="location-options-divider">
                        <div> </div>
                        <span>OR</span>
                        <div> </div>
                     </div>
                     <button className="gps-location-button">
                        <img src={assets.location_circle_icon} alt="" />
                        <p>Get current location using GPS</p>
                     </button>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
   );
};

export default ChooseLocationModal;
