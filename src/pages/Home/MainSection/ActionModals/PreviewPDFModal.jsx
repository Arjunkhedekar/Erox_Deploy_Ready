import React from 'react';
import { assets } from '../../../../assets/assets';
import './PreviewPDFModal.css';

const PreviewPDFModal = ({ toggleModal, fileUrl, fileName }) => {
    return (
        <div className="modal-overlay" onClick={toggleModal}>
            <div className="pdf-preview-modal" onClick={(e) => e.stopPropagation()}>
                <div className="pdf-preview-header">
                    <h3>{fileName}</h3>
                    <img
                        src={assets.close_button_red_icon}
                        alt=""
                        onClick={toggleModal}
                        className="close-button"
                    />
                </div>
                <div className="pdf-preview-content">
                    <iframe
                        src={fileUrl}
                        title="PDF Preview"
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>
        </div>
    );
};

export default PreviewPDFModal;