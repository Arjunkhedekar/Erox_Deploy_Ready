import React, { useState, useEffect } from "react";
// import "./AdvancedPrintSettingsModal.css";
import PrintSettings from "../PrintSettings/PrintSettings";
import { assets } from "../../../../assets/assets";
import {
    disableBodyScroll,
    enableBodyScroll,
} from "../../../../utils/modalUtils";
import PreviewPDFModal from "./PreviewPDFModal";

const AdvancedPrintSettingsModal = ({
    toggleModal,
    fileData,
    fileMetadata,
    globalMetadata,
    updateFileMetadata,
    getEffectiveMetadata,
}) => {
    const [selectedFile, setSelectedFile] = useState(0);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        disableBodyScroll();
        return () => {
            enableBodyScroll();
        };
    }, []);

    const currentMetadata = getEffectiveMetadata(selectedFile);
    const updateCurrentFileMetadata = (updates) => {
        updateFileMetadata(selectedFile, updates);
    };

    const handlePreviewClick = () => {
        if (fileData.length > 0) {
            const file = fileData[selectedFile].file;
            if (file.type === "application/pdf") {
                const fileUrl = URL.createObjectURL(file);
                setShowPreview(true);
            } else {
                alert("Only PDF files can be previewed");
            }
        }
    };

    return (
        <div
            className="fixed inset-0 w-full bg-black/50 flex justify-center items-center z-[1000] py-2.5"
            onClick={toggleModal}>
            <div
                className="relative bg-[#c2f0ff] w-full h-[98%] mx-4 md:w-[90%] md:max-w-[1200px] flex flex-col gap-8 px-5 py-10 md:p-8 rounded-lg overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                onClick={(e) => e.stopPropagation()}>
                <img
                    src={assets.close_button_red_icon}
                    alt=""
                    onClick={toggleModal}
                    className="absolute top-4 right-3 cursor-pointer h-6 w-6 z-10"
                />

                <div className="grid grid-rows-[auto_1fr_auto] grid-cols-1 md:grid-rows-[auto_1fr_auto] md:grid-cols-[2fr_4fr] gap-0 w-full h-full">
                    {/* Left Column */}
                    <div className="flex flex-col gap-2 col-span-1 md:col-span-1 md:row-span-2">
                        <div className="flex h-[85%] flex-col gap-2 w-[90%] mx-auto p-2 bg-[#e6f9ff] mt-4">
                            <div className="flex flex-col gap-[5px] w-[90%] md:w-[90%] mx-auto h-[80%] p-[5px] bg-[#e6f9ff] row-start-1 col-start-1 md:row-start-2 md:col-start-1">
                                {fileData.length === 0 ? (
                                    <div style={{ margin: "10px auto" }}>
                                        No files uploaded.
                                    </div>
                                ) : (
                                    fileData.map((file, index) => (
                                        <PreviewFilesListItem
                                            key={index}
                                            fileName={file.file.name}
                                            selected={selectedFile === index}
                                            onClick={() =>
                                                setSelectedFile(index)
                                            }
                                            isUsingGlobal={
                                                !fileMetadata[index]
                                                    ?.customApplied
                                            }
                                        />
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="flex justify-center items-center px-4 md:p-0">
                            <button
                                className="w-full md:w-[70%] px-4 py-2 rounded-lg bg-[#0092e4] text-white text-lg font-semibold"
                                onClick={handlePreviewClick}
                                disabled={fileData.length === 0}>
                                Preview
                            </button>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col col-span-1 md:col-span-1 md:gap-4 gap-0 mt-4">
                        <div className="flex flex-col p-2">
                            <h3 className="text-xl pl-3 font-medium text-[#152636]">
                                Metadata Options
                            </h3>
                        </div>

                        <div className="flex-1 overflow-y-auto w-[90%] mx-auto  rounded-md bg-[#e6f9ff]">
                            <PrintSettings
                                metadata={currentMetadata}
                                updateMetadata={updateCurrentFileMetadata}
                            />
                        </div>

                        {/* Updated Buttons Container */}
                        <div className="flex flex-col md:flex-row gap-3 justify-center items-stretch lg:items-center w-full my-5">
                            <button
                                className="py-2 px-6 bg-[#0092e4] text-white rounded-lg font-semibold w-full md:w-auto"
                                onClick={() => {
                                    updateFileMetadata(selectedFile, {}, false);
                                    // Force a re-render of the current metadata
                                    setSelectedFile(selectedFile);
                                }}>
                                Reset to Global
                            </button>
                            <button
                                className="py-2 px-6 bg-[#0092e4] text-white rounded-lg font-semibold w-full md:w-auto"
                                onClick={toggleModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showPreview && (
                <PreviewPDFModal
                    toggleModal={() => setShowPreview(false)}
                    fileUrl={URL.createObjectURL(fileData[selectedFile].file)}
                    fileName={fileData[selectedFile].file.name}
                />
            )}
        </div>
    );
};

const PreviewFilesListItem = ({
    fileName,
    selected,
    onClick,
    isUsingGlobal,
}) => {
    return (
        <div
            className={`flex justify-start items-center h-[40px] rounded-[10px] font-[Inter,Verdana,Geneva,Tahoma,sans-serif] text-[14px] cursor-pointer p-[10px] md:py-0 md:px-[12px] ${
                selected
                    ? "bg-[#ff6b6b] text-white shadow-md border-2 border-[#ff5252]"
                    : "bg-white"
            }`}
            onClick={onClick}>
            <div className="flex items-center min-w-0">
                <span className="truncate">
                    {fileName.length > 25
                        ? fileName.substring(0, 25) + "..."
                        : fileName}
                </span>
                {isUsingGlobal && (
                    <span className="ml-2 text-[10px] text-white whitespace-nowrap">
                        (Global)
                    </span>
                )}
            </div>
        </div>
    );
};

export default AdvancedPrintSettingsModal;
