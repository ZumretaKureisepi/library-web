import React, { useState } from "react";

const ImageUploader = ({ onFileUploaded }) => {
  const handleChange = async (e) => {
    // debugger;
    console.log("file to upload", e.target.files[0]);
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (e) => onFileUploaded(e.target.result);
    }
  };
  return (
    <div className="mb-2 col-sm-5">
      <input
        type="file"
        name="image"
        id="file"
        accept=".jpeg, .png, .jpg"
        onChange={handleChange}
      />
    </div>
  );
};

export default ImageUploader;
