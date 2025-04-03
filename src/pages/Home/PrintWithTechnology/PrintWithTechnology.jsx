import React from "react";
import "./PrintWithTechnology.css";
import { assets } from "../../../assets/assets";
const PrintWithTechnology = () => {
   return (
      <div id="print-with-technology-section">
         <img src={assets.man_taking_prints} alt="" id="man-taking-prints" />
         <img
            src={assets.paperplane_with_path}
            alt=""
            id="paperplane-with-path"
         />
         <h1>
            <span>PRINT</span> WITH TECHNOLOGY
         </h1>
         <img src={assets.man_sending_prints} alt="" id="man-sending-prints" />
      </div>
   );
};

export default PrintWithTechnology;
