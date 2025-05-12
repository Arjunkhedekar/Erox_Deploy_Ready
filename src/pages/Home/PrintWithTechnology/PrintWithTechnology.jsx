import React from "react";
// import "./PrintWithTechnology.css";
import { assets } from "../../../assets/assets";
const PrintWithTechnology = () => {
    return (
        <div className="relative w-full h-[80vh] md:h-[30vw] mb-[70px]">
            <img
                src={assets.man_taking_prints || "/placeholder.svg"}
                alt="Man taking prints"
                className="absolute top-0 left-0 z-[1]"
            />
            <img
                src={assets.paperplane_with_path || "/placeholder.svg"}
                alt="Paper plane with path"
                className="absolute top-[78%] left-[20%] md:top-[50%] md:left-[50%] transform md:-translate-x-[45%] md:-translate-y-[45%] z-[2] w-[90%] md:w-auto rotate-45 md:rotate-0 paperplane-svg"
            />
            <h1 className="absolute top-[70%] left-[50%] md:top-[90%] md:left-[60%] lg:left-[50%] lg:top-[50%] z-[3] bg-[#f2fcff] font-inter text-[45px] md:text-[40px] font-bold transform -translate-x-[50%] -translate-y-[105%]">
                <span className="text-[#00c2ff]">PRINT</span> WITH TECHNOLOGY
            </h1>
            <img
                src={assets.man_sending_prints || "/placeholder.svg"}
                alt="Man sending prints"
                className="absolute right-0 top-[65%] md:top-[25%] z-[1]"
            />
        </div>
    );
};
export default PrintWithTechnology;
