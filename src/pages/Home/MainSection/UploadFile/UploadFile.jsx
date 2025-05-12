import React from "react";
// import "./UploadFile.css";
import { assets } from "../../../../assets/assets";
const UploadFile = ({ onFileDataChange, fileData, setFileData }) => {
    const handleFileInputChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const pdfFiles = selectedFiles.filter(
            (file) => file.type === "application/pdf"
        );
        const newFiles = pdfFiles.map((file) => ({
            file,
            PrintMetadata: {
                copiesNo: 1,
                sides: "single",
                layout: "portrait",
                color: true,
                papersize: "A4",
            },
            customApplied: false,
        }));
        setFileData([...fileData, ...newFiles]);
        onFileDataChange([...fileData, ...newFiles]);
    };

    const handleRemoveFile = (index) => {
        const updatedFiles = fileData.filter((_, i) => i !== index);
        setFileData(updatedFiles);
        onFileDataChange(updatedFiles);
    };

    const printShortFileName = (fileName) => {
        return fileName.length > 40
            ? fileName.substring(0, 40) + "..."
            : fileName;
    };

    return (
        <div className="flex flex-col gap-3 md:w-full h-full mx-auto p-6 md:p-7 bg-[#87e2ff] rounded-xl shadow-lg">
            <div className="flex justify-start items-center gap-2.5">
                <img
                    src={assets.upload_file_icon || "/placeholder.svg"}
                    alt="Upload icon"
                />
                <div>
                    <h3 className="font-montserrat text-xl font-bold text-[#152636]">
                        UPLOAD YOUR FILE
                    </h3>
                    <p className="font-poppins text-sm md:text-base font-normal text-[#152636]">
                        We support all popular formats like PDF, JPG, PNG, JPEG
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between w-full h-full p-5 md:p-7 rounded-xl bg-[#e9faff]">
                <div className="w-[90%] h-[140px] overflow-y-auto">
                    <ul>
                        {fileData.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-1">
                                <p className="font-poppins text-base font-normal">
                                    {printShortFileName(file.file.name)}
                                </p>
                                <button
                                    className="bg-transparent border-none text-[#ff4444] cursor-pointer px-1.5 text-base font-bold opacity-70 hover:opacity-100 transition-opacity"
                                    onClick={() => handleRemoveFile(index)}>
                                    ✕
                                </button>
                            </div>
                        ))}
                    </ul>
                </div>
                <div className="w-[80%]">
                    <label className="relative inline-block w-full py-4 bg-[#0092e4] border-none rounded-lg text-center font-montserrat text-xl font-bold text-white cursor-pointer">
                        Upload your files
                        <input
                            type="file"
                            accept=".pdf"
                            multiple
                            onChange={handleFileInputChange}
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </label>
                    <p className="text-center text-[#555555] font-poppins text-sm md:text-base font-normal mt-2">
                        Maximum upload file size: 50MB Maximum files: 15
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UploadFile;
