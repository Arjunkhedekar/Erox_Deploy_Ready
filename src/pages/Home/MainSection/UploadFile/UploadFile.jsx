import React from "react";
import "./UploadFile.css";
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

   const printShortFileName = (fileName) => {
      return fileName.length > 40
         ? fileName.substring(0, 40) + "..."
         : fileName;
   };

   return (
      <div id="upload-file">
         <div id="upload-file-header">
            <img src={assets.upload_file_icon} alt="" />
            <div>
               <h3>UPLOAD YOUR FILE</h3>
               <p>We support all popular formats like PDF, JPG, PNG, JPEG</p>
            </div>
         </div>
         <div id="upload-file-box">
            <div id="file-list">
               <ul>
                  {fileData.map((file, index) => (
                     <p key={index}>{printShortFileName(file.file.name)}</p>
                  ))}
               </ul>
            </div>
            <div id="file-input">
               <label>
                  Upload your files
                  <input
                     type="file"
                     accept=".pdf"
                     multiple
                     onChange={handleFileInputChange}
                  />
               </label>
               <p>Maximum upload file size: 50MB Maximum files: 15</p>
            </div>
         </div>
      </div>
   );
};

export default UploadFile;
