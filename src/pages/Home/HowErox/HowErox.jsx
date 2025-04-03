import React, { useRef } from "react";
import "./HowErox.css";
import HowEroxStep from "./HowEroxStep";
import HowEroxSVGLine from "./HowEroxSVGLine";
import howErox_circleBig from "../../../assets/HowEroxSVGs/howErox_circleBig.svg";
import howErox_circleSmall from "../../../assets/HowEroxSVGs/howErox_circleSmall.svg";
import howErox_hand  from "../../../assets/HowEroxSVGs/howErox_hand.svg";


const HowErox = () => {
   const howEroxSteps = [
      {
         title: "Step 1: Choose Your Print Location and Upload Your File",
         description:
            "Select the most convenient print location for you and upload your document or image file.",
      },
      {
         title: "Step 2: Customize Your Print Settings",
         description:
            "Adjust the print settings to your preference and finalize your order with an easy and secure payment process.",
      },
      {
         title: "Step 3: Convenient Collection",
         description:
            "Your print will be sent directly to your selected booth. Choose to have it stored for later pickup or instantly printed for immediate collection.",
      },
      {
         title: "Step 4 : Flexible Pickup Options",
         description:
            "Collect your prints at your convenience or get them instantly—whenever you need them!",
      },
   ];
   const sectionRef = useRef(null);

   return (
      <div id="how-erox-section" ref={sectionRef}>
         <h1>HOW EroxPrints WORKS?</h1>
         {howEroxSteps.map((step, index) => (
            <HowEroxStep
               key={index}
               title={step.title}
               description={step.description}
            />
         ))}


         <HowEroxSVGLine sectionRef={sectionRef} />
      </div>
   );
};

export default HowErox;
