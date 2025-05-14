import React, { useState, useEffect, useRef } from "react";
// import "./PrintSettings.css";
import { assets } from "../../../../assets/assets";

const PrintSettings = ({ metadata, updateMetadata }) => {
    return (
        <div className="flex flex-row flex-nowrap items-center h-full w-full rounded-xl shadow-lg bg-[#f2fcff]">
            <div className="flex flex-col gap-4 justify-center items-center w-1/2 p-8 rounded-l-xl">
                <h3 className="font-poppins md:text-xl font-semibold text-[#152636]">
                    Copies
                </h3>
                <CopiesCounter
                    value={metadata.copies}
                    onChange={(count) => updateMetadata({ copies: count })}
                />
                <hr className="md:w-[150%] w-full lg:w-[100%] my-1 border-t border-gray-300" />
                <h3 className="font-poppins md:text-xl font-semibold text-[#152636]">
                    Select Color
                </h3>
                <ToggleButtonGroup
                    choice1="COLOR"
                    choice2="B&W"
                    selected={metadata.color}
                    onSelect={(color) => updateMetadata({ color })}
                />
                <hr className="md:w-[150%] w-full lg:w-[100%] my-1 border-t border-gray-300" />
                <h3 className="font-poppins md:text-xl font-semibold text-[#152636]">
                    Select Layout
                </h3>
                <ToggleButtonGroup
                    choice1="Portrait"
                    choice2="Landscape"
                    selected={metadata.layout}
                    onSelect={(layout) => updateMetadata({ layout })}
                />
            </div>
            <img src={assets.block_divider_line} alt="" className="h-full" />
            <div className="flex flex-col gap-4 items-center h-full w-1/2 p-8 rounded-r-xl">
                <h3 className="font-poppins md:text-xl font-semibold text-[#152636]">
                    Paper Size
                </h3>
                <ToggleButton
                    selected={metadata.paperSize === "A4"}
                    onClick={() => updateMetadata({ paperSize: "A4" })}>
                    A4
                </ToggleButton>
                <hr className="md:w-[150%] w-full lg:w-[100%] my-1 border-t border-gray-300" />
                <h3 className="font-poppins md:text-xl font-semibold text-[#152636]">
                    Select Sides
                </h3>
                <ToggleButtonGroup
                    choice1="Single Side"
                    choice2="Duplex"
                    selected={metadata.sides}
                    onSelect={(sides) => updateMetadata({ sides })}
                />
                <hr className="md:w-[150%] w-full lg:w-[100%] my-1 border-t border-gray-300" />
                <h3 className="font-poppins md:text-xl font-semibold text-[#152636]">
                    Pages to Print
                </h3>
                <PagesToPrintDropdown
                    selectedOption={metadata.pagesToPrint}
                    customRange={metadata.customRange}
                    onSelect={(option, customRange) =>
                        updateMetadata({
                            pagesToPrint: option,
                            ...(customRange !== undefined && { customRange }),
                        })
                    }
                />
            </div>
        </div>
    );
};

export const ToggleButtonGroup = ({ choice1, choice2, selected, onSelect }) => {
    return (
        <div className="flex flex-col gap-2 justify-center w-full">
            <ToggleButton
                selected={selected === choice1}
                onClick={() => onSelect(choice1)}>
                {choice1}
            </ToggleButton>
            <ToggleButton
                selected={selected === choice2}
                onClick={() => onSelect(choice2)}>
                {choice2}
            </ToggleButton>
        </div>
    );
};

export const ToggleButton = ({ children, onClick, selected }) => {
    return (
        <button
            className={`w-full py-3 rounded-lg font-poppins text-sm md:text-base font-medium transition-colors duration-200
            ${
                selected
                    ? "bg-[#0092e4] text-white shadow-md"
                    : "bg-[#c2f0ff] text-[#152636] hover:bg-[#62cfff] hover:text-white border border-[#87e2ff]"
            }`}
            onClick={onClick}>
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
        <div className="flex flex-row gap-2 justify-between items-center md:w-full lg:w-[60%]  h-10  md:h-full md:p-1 p-0 bg-[#c2f0ff] rounded-lg">
            <button
                onClick={() => value > 1 && onChange(value - 1)}
                className="md:w-10 md:h-10 w-9 h-7.5 bg-[#114eed] border-none rounded-full text-white text-4xl leading-5 hover:bg-[#0d3f9f] md:pb-1.5 pb-2">
                -
            </button>
            <input
                type="text"
                value={value}
                onChange={handleInputChange}
                className="w-12 px-1 bg-[#e5f7fd] border-none text-center font-inter text-xl font-normal text-[#4a4a4a] focus:outline-none"
            />
            <button
                onClick={() => onChange(value + 1)}
                className="md:w-10 md:h-10 w-9 h-7.5 bg-[#114eed] border-none rounded-full text-white text-4xl leading-5 hover:bg-[#0d3f9f] md:pt-0.5 md:pb-1.75 pb-3 pt-0.5 pl-0.20">
                +
            </button>
        </div>
    );
};

const PagesToPrintDropdown = ({ selectedOption, customRange, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [localSelectedOption, setLocalSelectedOption] =
        useState(selectedOption);

    useEffect(() => {
        if (isOpen) {
            dropdownRef.current.style.height = `${dropdownRef.current.scrollHeight}px`;
        } else {
            dropdownRef.current.style.height = "0px";
        }
    }, [isOpen]);

    useEffect(() => {
        setLocalSelectedOption(selectedOption);
    }, [selectedOption]);

    const options = [
        "All Pages",
        "First Page Only",
        "Even Pages Only",
        "Odd Pages Only",
        "Custom Range",
    ];

    const handleOptionSelect = (option) => {
        setLocalSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="relative flex flex-col items-center gap-1 w-full">
            <button
                className="flex justify-between items-center w-full px-3 py-3  bg-[#c2f0ff] border border-[#87e2ff] rounded-lg font-poppins text-base font-medium text-[#152636] hover:bg-[#c2f0ff]"
                onClick={() => setIsOpen(!isOpen)}>
                {localSelectedOption}
                <img
                    src={assets.dropdown_small_icon}
                    alt=""
                    className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>
            {localSelectedOption === "Custom Range" && (
                <input
                    type="text"
                    value={customRange}
                    onChange={(e) => onSelect("Custom Range", e.target.value)}
                    placeholder="e.g. 1-5, 7-9"
                    className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
            )}
            <ul
                ref={dropdownRef}
                className={`absolute bottom-full mb-1 z-10 overflow-hidden flex flex-col-reverse gap-1 w-[150px] shadow-lg bg-white transition-height duration-300`}>
                {options.map((option) => (
                    <li
                        key={option}
                        className="w-full px-2 py-3 border-b border-b-neutral-300 font-poppins text-base font-medium cursor-pointer list-none transition-all duration-300 hover:bg-[#1baddc] hover:text-white"
                        onClick={() => handleOptionSelect(option)}>
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PrintSettings;
