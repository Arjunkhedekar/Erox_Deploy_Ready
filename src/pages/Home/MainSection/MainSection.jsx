import React, { useState } from "react";
// import "./MainSection.css";
import ChooseLocation from "./ChooseLocation/ChooseLocation";
import UploadFile from "./UploadFile/UploadFile";
import PrintSettings from "./PrintSettings/PrintSettings";
import OrderFinalSmallModal from "./ActionModals/OrderFinalSmallModal";
import UploadFinalSmallModal from "./ActionModals/UploadFinalSmallModal";
import AdvancedPrintSettingsModal from "./ActionModals/AdvancedPrintSettingsModal";

const MainSection = () => {
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isAdvancedSettingsModalOpen, setIsAdvancedSettingsModalOpen] =
        useState(false);
    const [fileData, setFileData] = useState([]);

    // Global metadata state
    const [globalMetadata, setGlobalMetadata] = useState({
        copies: 1,
        color: "B&W",
        layout: "Portrait",
        paperSize: "A4",
        sides: "Single Side",
        pagesToPrint: "All Pages",
        customRange: "",
    });

    // File-specific metadata state
    const [fileMetadata, setFileMetadata] = useState({});

    const updateGlobalMetadata = (updates) => {
        setGlobalMetadata((prev) => ({ ...prev, ...updates }));
    };

    const updateFileMetadata = (fileIndex, updates, customApplied = true) => {
        setFileMetadata((prev) => {
            if (!customApplied) {
                // If resetting to global, remove the file's custom settings
                const newMetadata = { ...prev };
                delete newMetadata[fileIndex];
                return newMetadata;
            }
            return {
                ...prev,
                [fileIndex]: {
                    ...prev[fileIndex],
                    customApplied,
                    settings: {
                        ...(prev[fileIndex]?.settings || globalMetadata),
                        ...updates,
                    },
                },
            };
        });
    };

    const getEffectiveMetadata = (fileIndex) => {
        const fileSettings = fileMetadata[fileIndex];
        if (!fileSettings || !fileSettings.customApplied) {
            return globalMetadata;
        }
        return fileSettings.settings;
    };

    const handleFileDataChange = (data) => {
        setFileData(data);
    };

    const clearFileData = () => {
        handleFileDataChange([]);
        setFileMetadata({});
    };

    return (
        <div className="flex flex-col lg:flex-row flex-wrap gap-y-12 lg:gap-y-6 gap-x-0 md:w-[80%] lg:gap-x-16 w-full lg:w-[90%] mx-auto my-12 px-4 lg:px-0">
            <div className="w-full flex justify-start">
                <ChooseLocation />
            </div>

            {/* Left Column */}
            <div className="flex flex-col gap-5 w-full lg:w-[calc(50%-32px)]">
                <div className="w-full h-full">
                    <UploadFile
                        onFileDataChange={handleFileDataChange}
                        fileData={fileData}
                        setFileData={setFileData}
                    />
                </div>

                <div className="w-full lg:order-3">
                    <ActionButtonGroup
                        action1="Advanced Settings"
                        onClick1={() => setIsAdvancedSettingsModalOpen(true)}
                        action2="Clear Files"
                        onClick2={clearFileData}
                    />
                </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-5 w-full lg:w-[calc(50%-32px)] mt-5">
                <div className="w-full h-full lg:mt-0">
                    <PrintSettings
                        metadata={globalMetadata}
                        updateMetadata={updateGlobalMetadata}
                    />
                </div>

                <div className="w-full">
                    <ActionButtonGroup
                        action1="Select Order"
                        onClick1={() => setIsOrderModalOpen(true)}
                        action2="Proceed"
                        onClick2={() => setIsUploadModalOpen(true)}
                    />
                </div>
            </div>

            {/* Modals */}
            {isAdvancedSettingsModalOpen && (
                <AdvancedPrintSettingsModal
                    toggleModal={() => setIsAdvancedSettingsModalOpen(false)}
                    fileData={fileData}
                    fileMetadata={fileMetadata}
                    globalMetadata={globalMetadata}
                    updateFileMetadata={updateFileMetadata}
                    getEffectiveMetadata={getEffectiveMetadata}
                />
            )}
            {isOrderModalOpen && (
                <OrderFinalSmallModal
                    toggleModal={() => setIsOrderModalOpen(false)}
                />
            )}
            {isUploadModalOpen && (
                <UploadFinalSmallModal
                    toggleModal={() => setIsUploadModalOpen(false)}
                    fileData={fileData}
                    globalMetadata={globalMetadata}
                    fileMetadata={fileMetadata}
                />
            )}
        </div>
    );
};

const ActionButtonGroup = ({ action1, onClick1, action2, onClick2 }) => {
    return (
        <div className="flex justify-center items-center lg:gap-8 gap-4 h-full">
            <button
                onClick={onClick1}
                className="w-[45%] lg:w-[35%] py-4 px-4 bg-[#00c2ff] text-white text-sm md:text-[16px] border-none rounded-lg font-poppins lg:text-lg  font-semibold">
                {action1}
            </button>
            <button
                onClick={onClick2}
                className="w-[45%] lg:w-[35%] py-4 px-4 bg-[#00c2ff] text-white text-sm md:text-[16px] border-none rounded-lg font-poppins lg:text-lg  font-semibold">
                {action2}
            </button>
        </div>
    );
};

export default MainSection;
