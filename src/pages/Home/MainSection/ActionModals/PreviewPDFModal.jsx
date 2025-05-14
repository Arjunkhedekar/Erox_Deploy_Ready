import React from 'react';
import { assets } from '../../../../assets/assets';
// import './PreviewPDFModal.css';

const PreviewPDFModal = ({ toggleModal, fileUrl, fileName }) => {
    return (
        <div className="fixed inset-0 w-full h-full bg-black/50 flex justify-center items-center z-[1000] p-[10px_0]" onClick={toggleModal}>
            <div className="bg-white p-5 rounded-[10px] w-[80%] h-[80vh] relative flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
    <h3 className="m-0">{fileName}</h3>
    <img
      src={assets.close_button_red_icon}
      alt=""
      onClick={toggleModal}
      className="cursor-pointer"
    />
  </div>
  <div className="flex-1 border border-gray-300 rounded-[5px] overflow-hidden">
    <iframe
      src={fileUrl}
      title="PDF Preview"
      width="100%"
      height="100%"
      className="border-none"
    />
  </div>
            </div>
        </div>
    );
};

export default PreviewPDFModal;