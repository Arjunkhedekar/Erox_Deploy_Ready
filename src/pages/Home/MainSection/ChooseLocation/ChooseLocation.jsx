import React, { useState } from "react";
// import "./ChooseLocation.css";
import { assets } from "../../../../assets/assets";
import ChooseLocationModal from "./ChooseLocationModal";

const ChooseLocation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <div className="w-fit">
            {" "}
            <div
                id="choose-location"
                className="flex items-center gap-3 p-5 pr-5 bg-[#e3f8ff] rounded-lg shadow-md cursor-pointer transition-all hover:bg-[#d8f2ff] w-full max-w-[320px]"
                onClick={toggleModal}>
                <img
                    src={assets.location_pin_icon || "/placeholder.svg"}
                    alt="Location pin"
                    className="w-5 h-5"
                />
                <span className="font-poppins font-medium text-[#717375] truncate">
                    Choose print location...
                </span>
                <img
                    src={assets.dropdown_blue_icon || "/placeholder.svg"}
                    alt="Dropdown icon"
                    className="w-4 h-4 ml-auto"
                />
            </div>
            <ChooseLocationModal
                toggleModal={toggleModal}
                isModalOpen={isModalOpen}
            />
        </div>
    );
};

export default ChooseLocation;
