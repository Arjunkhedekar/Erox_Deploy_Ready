import React, { useState } from "react";
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
    React.useEffect(() => {
        disableBodyScroll();
        return () => {
            enableBodyScroll();
        };
    }, []);

    const [proceedOption, setProceedOption] = useState(
        "Upload and Print Later"
    );
    let orderIdArray = {};

    async function handleUpload(event) {
        event.preventDefault();

        const orderIdNo = Math.random().toString(36).substring(2, 8);

        let orderfilenames = fileData.map((item) => {
            return item.file.name;
        });
        orderIdArray = { [orderIdNo]: [...orderfilenames] };

        if (!localStorage.getItem("userid")) {
            localStorage.setItem("userid", uuidv4());
        }

        const userid = localStorage.getItem("userid");

        // Create an array of promises for all file uploads
        const uploadPromises = fileData.map(async (eachfile) => {
            try {
                let filename = eachfile.file.name;
                let uid = userid;
                const storageref = ref(storage, `${uid}/${orderIdNo}`);
                const storageref2 = ref(storageref, `${filename}`);
                const metadata = {
                    contentType: "application/pdf",
                    customMetadata: {
                        orderIdNo,
                        ...globalMetadata,
                        ...fileMetadata,
                        uuid: uid,
                    },
                };

                await uploadBytesResumable(
                    storageref2,
                    eachfile.file,
                    metadata
                );
                console.log("DONE");
            } catch (error) {
                console.log("this is in catch block");
                console.error(error);
                throw error; // Re-throw to handle in the caller
            }
        });

        try {
            // Wait for all uploads to complete
            await Promise.all(uploadPromises);

            // Update localStorage
            if (!localStorage.getItem("orderIdNo")) {
                localStorage.setItem("orderIdNo", JSON.stringify(orderIdArray));
            } else {
                let pendingids = JSON.parse(localStorage.getItem("orderIdNo"));
                pendingids = { ...pendingids, ...orderIdArray };
                localStorage.setItem("orderIdNo", JSON.stringify(pendingids));
            }

            // Close the modal after successful upload
            toggleModal();
        } catch (error) {
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
                    </div>
                    <div className="modal-footer">
                        <button
                            disabled={!fileData || fileData.length === 0}
                            onClick={async (e) => {
                                if (proceedOption === "Upload and Print Later") {
                                    await handleUpload(e);
                                }
                                if (proceedOption === "Print and Store") {
                                    await handleUpload(e);
                                    const orderIdNo = Object.keys(orderIdArray)[0];
                                    const userId = localStorage.getItem("userid");
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
                                    toggleModal();
                                }
                            }}>
                            {!fileData || fileData.length === 0 ? 'No Files Selected' : 'Upload'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadFinalSmallModal;
