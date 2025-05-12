import React, { useState, useEffect } from "react";
// import "./FinalSmallModals.css";
import { assets } from "../../../../assets/assets";
import { ToggleButtonGroup } from "../PrintSettings/PrintSettings";
import { ref, uploadBytesResumable } from "firebase/storage";
import {
    disableBodyScroll,
    enableBodyScroll,
} from "../../../../utils/modalUtils";
import { v4 as uuidv4 } from "uuid";
import { storage, db } from "../../../../firebase";
import { doc, setDoc, collection, getDocs, query, where } from "firebase/firestore";
import sendRequestToBackend from "../../print";
import { signIn } from "../../../../userAuth";

const UploadFinalSmallModal = ({
    toggleModal,
    fileData,
    globalMetadata,
    fileMetadata,
}) => {
    const [proceedOption, setProceedOption] = useState(
        "Upload and Print Later"
    );
    const [uploadProgress, setUploadProgress] = useState({});
    const [displayProgress, setDisplayProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [orderIdArray, setOrderIdArray] = useState({});
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [user, setUser] = useState(localStorage.getItem("user") || null);

    useEffect(() => {
        checkLogin();
        disableBodyScroll();
        return () => {
            enableBodyScroll();
        };
    }, []);

    const checkLogin = async () => {
        if (!user) {
            await signIn()
                .then((details) => {
                    console.log(details.user.uid);
                    localStorage.setItem("user", details.user.uid);
                    setUser(details.user.uid);
                })
                .catch((e) => console.log(e));
            return;
        }
    };

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            const progressValues = Object.values(uploadProgress);
            const totalProgress =
                progressValues.reduce((a, b) => a + b, 0) /
                (progressValues.length || 1);
            setDisplayProgress((prev) => prev + (totalProgress - prev) * 0.2);
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

        const uploadPromises = fileData.map((eachfile) => {
            const uid = localStorage.getItem("user");
            return new Promise((resolve, reject) => {
                const filename = eachfile.file.name;
                const storageRef = ref(
                    storage,
                    `${uid}/${orderIdNo}/${filename}`
                );
                const metadata = {
                    contentType: "application/pdf",
                    customMetadata: {
                        orderIdNo,
                        ...globalMetadata,
                        ...fileMetadata,
                        uuid: uid,
                    },
                };

                const uploadTask = uploadBytesResumable(
                    storageRef,
                    eachfile.file,
                    metadata
                );

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
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

        if (user) {
            try {
                await Promise.all(uploadPromises);

                // Create order document in users/userId/orders subcollection
                const orderRef = doc(db, `users/${user}/orders`, orderIdNo);
                await setDoc(orderRef, {
                    files: filenames,
                    metadata: {
                        ...globalMetadata,
                        ...fileMetadata
                    },
                    createdAt: new Date().toISOString(),
                    status: "uploaded",
                    storagePath: `${user}/${orderIdNo}`
                });

                // Update localStorage for backward compatibility
                const existing = JSON.parse(localStorage.getItem("orderIdNo")) || {};
                localStorage.setItem(
                    "orderIdNo",
                    JSON.stringify({ ...existing, ...newOrderIdEntry })
                );

                setUploading(false);
                setUploadSuccess(true); // Set success state instead of closing modal
            } catch (error) {
                setUploading(false);
                setUploadSuccess(false);
                console.error("Upload failed:", error);
            }
        }
    }

    return (
        <div
            className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={toggleModal}>
            <div
                className="relative bg-[#c2f0ff] lg:w-[35%] md:w-[70%] w-[90%] h-[75%] md:h-[75%] rounded-lg p-5"
                onClick={(e) => e.stopPropagation()}>
                <img
                    src={assets.close_button_red_icon}
                    alt=""
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={toggleModal}
                />
                <div className="flex flex-col justify-between h-full">
                    <div className="modal-heading mb-4">
                        <h2 className="text-2xl font-medium text-center">
                            Proceed to Upload
                        </h2>
                    </div>
                    <div className="modal-content flex flex-col gap-4 bg-[#f2fcff] p-8 rounded-lg shadow-lg h-[70%]">
                        <ToggleButtonGroup
                            choice1="Print and Store"
                            choice2="Upload and Print Later"
                            selected={proceedOption}
                            onSelect={(choice) => setProceedOption(choice)}
                        />

                        {uploading && (
                            <div className="upload-progress mt-5 text-center">
                                <p>Uploading files...</p>
                                <progress
                                    value={displayProgress}
                                    max="100"
                                    className="w-full h-3 rounded-lg bg-gray-200"
                                />
                                <span className="block mt-2 text-sm">
                                    {displayProgress.toFixed(0)}%
                                </span>
                            </div>
                        )}

                        {uploadSuccess && (
                            <div className="upload-success mt-5 p-4 bg-green-100 rounded-lg text-center text-green-700">
                                <p className="font-semibold">
                                    ✅ Files uploaded successfully!
                                </p>
                                <p>
                                    You can now close this window or upload more
                                    files.
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer md:mt-5 mt-2 flex justify-center  gap-4  md:pb-5 pb-2">
                        <button
                            disabled={
                                !fileData || fileData.length === 0 || uploading
                            }
                            onClick={async (e) => {
                                if (
                                    proceedOption ===
                                        "Upload and Print Later" &&
                                    user
                                ) {
                                    await handleUpload(e);
                                }
                                if (
                                    proceedOption === "Print and Store" &&
                                    user
                                ) {
                                    await handleUpload(e);
                                    const orderIdNo =
                                        Object.keys(orderIdArray)[0];
                                    const userId = localStorage.getItem("user");
                                    const filenames = orderIdArray[orderIdNo];
                                    const metadata = {
                                        ...globalMetadata,
                                        ...fileMetadata,
                                    };
                                    await sendRequestToBackend(
                                        orderIdNo,
                                        userId,
                                        filenames,
                                        metadata
                                    );
                                } else {
                                    checkLogin();
                                }
                            }}
                            className="px-6 py-2  bg-[#0092e4] text-white font-semibold rounded-lg disabled:opacity-50 ">
                            {!fileData || fileData.length === 0
                                ? "No Files Selected"
                                : uploading
                                ? "Uploading..."
                                : "Upload"}
                        </button>
                    </div>
                </div>
            </div>
            {showLoginModal && (
                <LoginRegisterModal
                    onClose={() => setShowLoginModal(false)}
                    onLoginSuccess={() => {
                        setShowLoginModal(false);
                        handleUpload(event); // Retry upload after successful login
                    }}
                />
            )}
        </div>
    );
};

export default UploadFinalSmallModal;
