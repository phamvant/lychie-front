import React, { useState } from "react";

const UploadImage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedFiles = Array.from(event.target.files!) as File[]; // Type assertion for FileList

    setSelectedFiles((prevFiles) => [...prevFiles, ...newSelectedFiles] as []);

    const newPreviewUrls = newSelectedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls] as []);
  };

  const removeImage = (index: number) => {
    const updatedSelectedFiles = [...selectedFiles];
    updatedSelectedFiles.splice(index, 1);
    setSelectedFiles(updatedSelectedFiles);

    const updatedPreviewUrls = [...previewUrls];
    updatedPreviewUrls.splice(index, 1);
    setPreviewUrls(updatedPreviewUrls);
  };

  return (
    <div className="upload-container">
      <h2>Add Images:</h2>
      <input type="file" multiple onChange={handleChange} />
      {previewUrls.length > 0 && (
        <div className="preview-grid">
          {previewUrls.map((url, index) => (
            <div key={index} className="preview-item">
              <img src={url} alt={`Uploaded image ${index + 1}`} />
              <button onClick={() => removeImage(index)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadImage;
