import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
// import "./ChooseLocationModal.css";
import { assets } from "../../../../assets/assets";
import IconInputBar from "../../../../components/IconInputBar/IconInputBar";
import {
   disableBodyScroll,
   enableBodyScroll,
} from "../../../../utils/modalUtils";

const ChooseLocationModal = ({ toggleModal, isModalOpen }) => {
   useEffect(() => {
     if (isModalOpen) {
       disableBodyScroll()
     } else {
       enableBodyScroll()
     }
     return () => enableBodyScroll()
   }, [isModalOpen])
 
   return (
     <AnimatePresence>
       {isModalOpen && (
         <div
           className="fixed inset-0 w-full h-full bg-black/50 flex justify-center items-center z-[1000]"
           onClick={toggleModal}
         >
           <motion.div
             key={"location-modal"}
             initial={{ x: -550 }}
             animate={{ x: 0 }}
             exit={{ x: -550 }}
             transition={{ duration: 0.3, type: "tween" }}
             className="fixed top-0 left-0 h-full w-[80%] md:w-[35%] p-5 bg-[#f2fcff]"
             onClick={(e) => e.stopPropagation()}
           >
             <img
               src={assets.back_button_circle_icon || "/placeholder.svg"}
               alt="Back button"
               onClick={toggleModal}
               className="cursor-pointer"
             />
             <div className="flex flex-col justify-center items-center gap-5 w-full mt-[60px] mx-auto">
               <IconInputBar type={"text"} placeholder={"Search for colleges, area..."} icon={assets.search_icon} />
               <div className="flex justify-center items-center gap-4 w-[60%]">
                 <div className="w-full h-px bg-[#00c2ff]"></div>
                 <span className="font-poppins text-xs font-medium">OR</span>
                 <div className="w-full h-px bg-[#00c2ff]"></div>
               </div>
               <button className="flex justify-center items-center gap-4 w-[70%] py-2.5 px-5 border-none rounded bg-[#00c2ff] font-inter text-base font-normal text-white">
                 <img src={assets.location_circle_icon || "/placeholder.svg"} alt="Location icon" />
                 <p>Get current location using GPS</p>
               </button>
             </div>
           </motion.div>
         </div>
       )}
     </AnimatePresence>
   )
 }


export default ChooseLocationModal;
