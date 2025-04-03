import React, { useState, useEffect } from "react";
import "./AdvancedPrintSettingsModal.css";
import PrintSettings from "../PrintSettings/PrintSettings";
import { assets } from "../../../../assets/assets";
import {
    disableBodyScroll,
    enableBodyScroll,
} from "../../../../utils/modalUtils";

const AdvancedPrintSettingsModal = ({
    toggleModal,
    fileData,
    fileMetadata,
    globalMetadata,
    updateFileMetadata,
    getEffectiveMetadata,
}) => {
    const [selectedFile, setSelectedFile] = useState(0);

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

    return (
        <div className="modal-overlay" onClick={toggleModal}>
            <div
                className="settings-big-modal"
                onClick={(e) => e.stopPropagation()}>
                <img
                    src={assets.close_button_red_icon}
                    alt=""
                    onClick={toggleModal}
                    className="close-button"
                />
                <h2>Settings Dialog</h2>
                <div id="settings-big-modal-inner">
                    <div className="preview-files-header top-left-container">
                        <h3>Files</h3>
                    </div>
                    <div className="preview-files-list middle-left-container">
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
                                    onClick={() => setSelectedFile(index)}
                                    isUsingGlobal={
                                        !fileMetadata[index]?.customApplied
                                    }
                                />
                            ))
                        )}
                    </div>
                    <div className="preview-files-buttons bottom-left-container">
                        <button>Preview</button>
                    </div>

                    <div className="settings-dialog-header top-right-container">
                        <h3>Metadata Options</h3>
                    </div>
                    <div className="settings-dialog middle-right-container">
                        <PrintSettings
                            metadata={currentMetadata}
                            updateMetadata={updateCurrentFileMetadata}
                        />
                    </div>
                    <div className="settings-dialog-buttons bottom-right-container">
                        <button
                            onClick={() => {
                                updateFileMetadata(selectedFile, {}, false);
                            }}>
                            Reset to Global
                        </button>
                        <button onClick={toggleModal}>Close</button>
                    </div>
                </div>
            </div>
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
            className={`preview-files-list-item ${selected ? "selected" : ""}`}
            onClick={onClick}>
            <span>
                {fileName.length > 25
                    ? fileName.substring(0, 25) + "..."
                    : fileName}
            </span>
            {isUsingGlobal && (
                <span className="global-indicator">(Global)</span>
            )}
        </div>
    );
};

export default AdvancedPrintSettingsModal;
