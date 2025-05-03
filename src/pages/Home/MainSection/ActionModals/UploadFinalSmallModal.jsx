import React, { useState, useEffect } from "react";
import "./FinalSmallModals.css";
import { assets } from "../../../../assets/assets";
import { ToggleButtonGroup } from "../PrintSettings/PrintSettings";
import { ref, uploadBytesResumable } from "firebase/storage";
import {
    disableBodyScroll,
    enableBodyScroll,
} from "../../../../utils/modalUtils";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../../../firebase";
import sendRequestToBackend from "../../print";

const UploadFinalSmallModal = ({
    toggleModal,
    fileData,
    globalMetadata,
    fileMetadata,
}) => {
    const [proceedOption, setProceedOption] = useState("Upload and Print Later");
    const [uploadProgress, setUploadProgress] = useState({});
    const [displayProgress, setDisplayProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [orderIdArray, setOrderIdArray] = useState({});
    const [uploadSuccess, setUploadSuccess] = useState(false);

    useEffect(() => {
        disableBodyScroll();
        return () => {
            enableBodyScroll();
        };
    }, []);

    // Calculate smooth average progress
    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            const progressValues = Object.values(uploadProgress);
            const totalProgress =
                progressValues.reduce((a, b) => a + b, 0) /
                (progressValues.length || 1);
            setDisplayProgress((prev) =>
                prev + (totalProgress - prev) * 0.2
            );
        });

        return () => cancelAnimationFrame(frame);
    }, [uploadProgress]);

    async function handleUpload(event) {
        event.preventDefault();
        setUploading(true);
        setUploadSuccess(false); // Reset success state

        const orderIdNo = Math.random().toString(36).substring(2, 8);
        const filenames = fileData.map((item) => item.file.name);
        const newOrderIdEntry = { [orderIdNo]: filenames };
        setOrderIdArray(newOrderIdEntry);

        const isLoggedIn = localStorage.getItem("user")?.split('"')[1] || null;
        if (!isLoggedIn) {
            localStorage.setItem("userid", uuidv4());
        }
        const uid = isLoggedIn || localStorage.getItem("userid");

        const uploadPromises = fileData.map((eachfile) => {
            return new Promise((resolve, reject) => {
                const filename = eachfile.file.name;
                const storageRef = ref(storage, `${uid}/${orderIdNo}/${filename}`);
                const metadata = {
                    contentType: "application/pdf",
                    customMetadata: {
                        orderIdNo,
                        ...globalMetadata,
                        ...fileMetadata,
                        uuid: uid,
                    },
                };

                const uploadTask = uploadBytesResumable(storageRef, eachfile.file, metadata);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUploadProgress((prev) => ({
                            ...prev,
                            [filename]: progress,
                        }));
                    },
                    (error) => {
                        console.error("Upload error:", error);
                        reject(error);
                    },
                    () => {
                        setUploadProgress((prev) => ({
                            ...prev,
                            [filename]: 100,
                        }));
                        resolve();
                    }
                );
            });
        });

        try {
            await Promise.all(uploadPromises);

            const existing = JSON.parse(localStorage.getItem("orderIdNo")) || {};
            localStorage.setItem("orderIdNo", JSON.stringify({ ...existing, ...newOrderIdEntry }));

            setUploading(false);
            setUploadSuccess(true); // Set success state instead of closing modal
        } catch (error) {
            setUploading(false);
            setUploadSuccess(false);
            console.error("Upload failed:", error);
        }
    }

    return (
        <div className="modal-overlay" onClick={toggleModal}>
            <div
                className="action-small-modal"
                onClick={(e) => e.stopPropagation()}>
                <img
                    src={assets.close_button_red_icon}
                    alt=""
                    onClick={toggleModal}
                />
                <div className="modal-container-inner">
                    <div className="modal-heading">
                        <h2>Proceed to Upload</h2>
                    </div>
                    <div className="modal-content">
                        <ToggleButtonGroup
                            choice1="Print and Store"
                            choice2="Upload and Print Later"
                            selected={proceedOption}
                            onSelect={(choice) => setProceedOption(choice)}
                        />

                        {uploading && (
                            <div className="upload-progress">
                                <p>Uploading files...</p>
                                <progress
                                    value={displayProgress}
                                    max="100"
                                />
                                <span>{displayProgress.toFixed(0)}%</span>
                            </div>
                        )}

                        {uploadSuccess && (
                            <div className="upload-success">
                                <p>✅ Files uploaded successfully!</p>
                                <p>You can now close this window or upload more files.</p>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button
                            disabled={!fileData || fileData.length === 0 || uploading}
                            onClick={async (e) => {
                                if (proceedOption === "Upload and Print Later") {
                                    await handleUpload(e);
                                }
                                if (proceedOption === "Print and Store") {
                                    await handleUpload(e);
                                    const orderIdNo = Object.keys(orderIdArray)[0];
                                    const userId = localStorage.getItem("user")?.split('"')[1] || localStorage.getItem("userid");
                                    const filenames = orderIdArray[orderIdNo];
                                    const metadata = {
                                        ...globalMetadata,
                                        ...fileMetadata,
                                    };
                                    await sendRequestToBackend(orderIdNo, userId, filenames, metadata);
                                }
                            }}
                        >
                            {!fileData || fileData.length === 0
                                ? "No Files Selected"
                                : uploading
                                ? "Uploading..."
                                : "Upload"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadFinalSmallModal;
