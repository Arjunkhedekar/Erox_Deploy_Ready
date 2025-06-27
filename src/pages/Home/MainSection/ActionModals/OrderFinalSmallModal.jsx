import React from "react";
import { assets } from "../../../../assets/assets";
import {
    disableBodyScroll,
    enableBodyScroll,
} from "../../../../utils/modalUtils";
import { db } from "../../../../firebase";
import { collection, doc, deleteDoc, setDoc, onSnapshot } from "firebase/firestore";
import sendRequestToBackend from "../../print";

// Module-level variables for listener management
let isListenerActive = false;
let unsubscribeListener = null;

const OrderFinalSmallModal = ({ toggleModal }) => {
    const [orderIdData, setOrderIdData] = React.useState([]);
    const [selectedOrder, setSelectedOrder] = React.useState(null);
    const [dataSynced, setDataSynced] = React.useState(false);

    React.useEffect(() => {
        disableBodyScroll();
        const userId = localStorage.getItem("user");
        
        const syncOrders = () => {
            if (!userId) return;

            // Load initial state from localStorage
            const localOrders = localStorage.getItem("orderIdNo");
            if (localOrders) {
                setOrderIdData(Object.entries(JSON.parse(localOrders)));
            }

            console.log("1")
            // Create listener only once
            if (!isListenerActive) {
                console.log("updated")
                
                const ordersCollection = collection(db, `users/${userId}/orders`);
                unsubscribeListener = onSnapshot(ordersCollection, (snapshot) => {
                    console.log("inside snap")
                    const newOrders = {};
                    snapshot.forEach((doc) => {
                        newOrders[doc.id] = doc.data().files;
                    });

                    const currentLocal = JSON.parse(localStorage.getItem("orderIdNo") || "{}");
                    
                    // Update only if there are changes
                    if (JSON.stringify(currentLocal) !== JSON.stringify(newOrders)) {
                        localStorage.setItem("orderIdNo", JSON.stringify(newOrders));
                        setOrderIdData(Object.entries(newOrders));
                    }
                    
                    setDataSynced(true);
                });

                isListenerActive = true;
            }
        };

        syncOrders();

        return () => {
            enableBodyScroll();
            // Keep listener active for subsequent mounts
        };
    }, []);

    const handleOrderSelect = (orderId) => {
        setSelectedOrder(orderId);
    };

    // const handleClearOrder = async () => {
    //     if (selectedOrder) {
    //         const userId = localStorage.getItem("user");
    //         if (userId) {
    //             try {
    //                 // Delete from Firestore (listener will auto-update localStorage)
    //                 await deleteDoc(doc(db, `users/${userId}/orders`, selectedOrder));
    //                 setSelectedOrder(null);
    //             } catch (error) {
    //                 console.error("Error clearing order:", error);
    //             }
    //         }
    //     }
    // };

    const handlePrintOrder = async () => {
        if (selectedOrder) {
            const userId = localStorage.getItem("user");
            const orderData = JSON.parse(localStorage.getItem("orderIdNo"));
            const filenames = orderData[selectedOrder];
            
            try {
                // Update last printed timestamp
                const orderRef = doc(db, `users/${userId}/orders`, selectedOrder);
                // console.log("!!!")
                await setDoc(orderRef, {
                    lastPrinted: new Date().toISOString()
                }, { merge: true });
                
                // Send print request
                await sendRequestToBackend(selectedOrder, userId, filenames);
            } catch (error) {
                console.error("Error updating print status:", error);
            }
        }
    };

    return (
        <div
            className="fixed w-full inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={toggleModal}>
            <div
                className="relative md:w-[75%] lg:w-[50%] w-[90%] h-[75%] bg-[#c2f0ff] rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}>
                <img
                    src={assets.close_button_red_icon}
                    alt="Close modal"
                    className="absolute top-2 right-2 cursor-pointer w-6 h-6"
                    onClick={toggleModal}
                />

                <div className="flex flex-col justify-between gap-6 w-[80%] h-[80%] mx-auto mt-14">
                    <div className="text-center">
                        <h2 className="font-poppins text-2xl font-medium">
                            Select Order To Print
                        </h2>
                    </div>

                    <div className="flex flex-col gap-3 h-[70%] p-6 rounded-xl shadow-lg bg-[#f2fcff] overflow-y-auto">
                        {orderIdData.length > 0 ? (
                            <div className="space-y-3">
                                {orderIdData.map(([orderId, files]) => (
                                    <div
                                        key={orderId}
                                        className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 flex justify-between items-start
                                            ${
                                                selectedOrder === orderId
                                                    ? "bg-[#e3f2fd] border-blue-400 shadow-inner"
                                                    : "border-gray-300 hover:bg-gray-50"
                                            }`}
                                        onClick={() => handleOrderSelect(orderId)}>
                                        <div>
                                            <h3 className="font-poppins text-lg font-medium mb-1">
                                                Order ID: {orderId}
                                            </h3>
                                            <div className="space-y-1">
                                                {files.map((file, index) => (
                                                    <p
                                                        key={index}
                                                        className="font-poppins text-sm text-gray-600">
                                                        {file}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <h2 className="font-poppins text-xl text-center">
                                {dataSynced ? "No Current Orders Found" : "Loading Orders..."}
                            </h2>
                        )}
                    </div>

                    <div className="flex justify-around gap-4">
                        <button
                            className={`min-w-[45%] md:py-2 py-5 md:px-5 px-3 rounded-lg font-poppins md:text-lg text-sm font-semibold text-white transition-colors
                                ${
                                    selectedOrder
                                        ? "bg-[#0092e4] hover:bg-[#0077c2]"
                                        : "bg-[#0092e4]/60 cursor-not-allowed"
                                }`}
                            onClick={handlePrintOrder}
                            disabled={!selectedOrder}>
                            Print This Order
                        </button>

                        {/* <button
                            className={`min-w-[45%] md:py-2 py-2 md:px-5 px-3 rounded-lg font-poppins md:text-lg text-sm font-semibold text-white transition-colors
                                ${
                                    selectedOrder
                                        ? "bg-red-500 hover:bg-red-600"
                                        : "bg-red-500/60 cursor-not-allowed"
                                }`}
                            onClick={handleClearOrder}
                            disabled={!selectedOrder}>
                            Clear This Order
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderFinalSmallModal;