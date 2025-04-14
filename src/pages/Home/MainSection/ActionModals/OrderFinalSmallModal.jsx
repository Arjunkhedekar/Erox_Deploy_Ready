import React from "react";
import "./FinalSmallModals.css";
import { assets } from "../../../../assets/assets";
import {
    disableBodyScroll,
    enableBodyScroll,
} from "../../../../utils/modalUtils";
import sendRequestToBackend from "../../print";

const OrderFinalSmallModal = ({ toggleModal }) => {
    const [orderIdData, setOrderIdData] = React.useState([]);
    const [selectedOrder, setSelectedOrder] = React.useState(null);

    React.useEffect(() => {
        disableBodyScroll();
        // Fetch orders from localStorage
        const orders = localStorage.getItem("orderIdNo");
        if (orders) {
            const parsedOrders = JSON.parse(orders);
            setOrderIdData(Object.entries(parsedOrders));
        }
        return () => {
            enableBodyScroll();
        };
    }, []);

    const handleOrderSelect = (orderId) => {
        setSelectedOrder(orderId);
    };

    const handleClearOrder = () => {
        if (selectedOrder) {
            const updatedOrders = {
                ...JSON.parse(localStorage.getItem("orderIdNo")),
            };
            delete updatedOrders[selectedOrder];
            localStorage.setItem("orderIdNo", JSON.stringify(updatedOrders));
            setOrderIdData(Object.entries(updatedOrders));
            setSelectedOrder(null);
        }
    };

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
                        <h2>Select Order To Print</h2>
                    </div>
                    <div className="modal-content">
                        {orderIdData.length > 0 ? (
                            <div className="orders-list">
                                {orderIdData.map(([orderId, files]) => (
                                    <div
                                        key={orderId}
                                        className={`order-item ${
                                            selectedOrder === orderId
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleOrderSelect(orderId)
                                        }>
                                        <h3>Order ID: {orderId}</h3>
                                        <div className="files-list">
                                            {files.map((file, index) => (
                                                <p
                                                    key={index}
                                                    className="file-item">
                                                    {file}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <h2>No Current Orders Found</h2>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button
                            onClick={() => {
                                if (selectedOrder) {
                                    const userId =
                                        localStorage.getItem("userid");
                                    const orderData = JSON.parse(
                                        localStorage.getItem("orderIdNo")
                                    );
                                    const filenames = orderData[selectedOrder];
                                    sendRequestToBackend(
                                        selectedOrder,
                                        userId,
                                        filenames
                                    );
                                }
                            }}
                            disabled={!selectedOrder}>
                            Print This Order
                        </button>
                        <button
                            onClick={handleClearOrder}
                            disabled={!selectedOrder}>
                            Clear This Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderFinalSmallModal;
