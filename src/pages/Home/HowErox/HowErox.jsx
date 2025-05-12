import React, { useRef } from "react";
// import "./HowErox.css";
import HowEroxStep from "./HowEroxStep";
import HowEroxSVGLine from "./HowEroxSVGLine";
import howErox_circleBig from "../../../assets/HowEroxSVGs/howErox_circleBig.svg";
import howErox_circleSmall from "../../../assets/HowEroxSVGs/howErox_circleSmall.svg";
import howErox_hand from "../../../assets/HowEroxSVGs/howErox_hand.svg";

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
        <div
            id="how-erox-section"
            ref={sectionRef}
            className="relative flex flex-col lg:gap-12 gap-8 w-[92%] md:w-[85%] h-auto lg:h-[210vh] mx-auto my-12 p-12 md:p-12 rounded-[100px] bg-[#0092e4] items-center ">
            <h1 className="mb-8 font-inter text-4xl md:text-5xl font-extrabold text-white text-center">
                HOW EroxPrints WORKS?
            </h1>

            {howEroxSteps.map((step, index) => (
                <HowEroxStep
                    key={index}
                    title={step.title}
                    description={step.description}
                    className={`relative z-[1] w-[70%] md:w-[60%] mb-5 lg:w-[34%] ${
                        index === 0
                            ? ""
                            : index === 1
                            ? ""
                            : index === 2
                            ? ""
                            : ""
                    }`}
                />
            ))}

            <HowEroxSVGLine sectionRef={sectionRef} />
        </div>
    );
};

export default HowErox;
