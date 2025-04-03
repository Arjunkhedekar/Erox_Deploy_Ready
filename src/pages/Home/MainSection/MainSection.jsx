import React, { useState } from "react";
import "./MainSection.css";
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
        setFileMetadata((prev) => ({
            ...prev,
            [fileIndex]: {
                ...prev[fileIndex],
                customApplied,
                settings: {
                    ...(prev[fileIndex]?.settings || globalMetadata),
                    ...updates,
                },
            },
        }));
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
        <div id="main-section">
            <div className="top-left-container">
                <ChooseLocation />
            </div>
            <div className="middle-left-container">
                <UploadFile
                    onFileDataChange={handleFileDataChange}
                    fileData={fileData}
                    setFileData={setFileData}
                />
            </div>
            <div className="middle-right-container">
                <PrintSettings
                    metadata={globalMetadata}
                    updateMetadata={updateGlobalMetadata}
                />
            </div>
            <div className="bottom-left-container">
                <ActionButtonGroup
                    action1="Advanced Settings"
                    onClick1={() => setIsAdvancedSettingsModalOpen(true)}
                    action2="Clear Files"
                    onClick2={clearFileData}
                />
            </div>
            <div className="bottom-right-container">
                <ActionButtonGroup
                    action1="Select Order"
                    onClick1={() => setIsOrderModalOpen(true)}
                    action2="Proceed"
                    onClick2={() => setIsUploadModalOpen(true)}
                />
            </div>

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
        <div className="action-button-group">
            <button onClick={onClick1} className="action-button">
                {action1}
            </button>
            <button onClick={onClick2} className="action-button">
                {action2}
            </button>
        </div>
    );
};

export default MainSection;
