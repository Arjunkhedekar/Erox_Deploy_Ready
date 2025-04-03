import React from "react";
import "./FinalSmallModals.css";
import { assets } from "../../../../assets/assets";
import {
   disableBodyScroll,
   enableBodyScroll,
} from "../../../../utils/modalUtils";
import sendRequestToBackend from "../../print";

const OrderFinalSmallModal = ({ toggleModal }) => {
   React.useEffect(() => {
      disableBodyScroll();
      return () => {
         enableBodyScroll();
      };
   }, []);

   return (
      <div className="modal-overlay" onClick={toggleModal}>
         <div
            className="action-small-modal"
            onClick={(e) => e.stopPropagation()}
         >
            <img
               src={assets.close_button_red_icon}
               alt=""
               onClick={toggleModal}
            />
            <div className="modal-container-inner">
               <div className="modal-heading">
                  <h2>Select Order To Print</h2>
               </div>
               <div className="modal-content">
                  <h2>No Current Orders Found</h2>
               </div>
               <div className="modal-footer">
                  <button onClick={sendRequestToBackend}>Print This Order</button>
                  <button>Clear This Order</button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default OrderFinalSmallModal;
