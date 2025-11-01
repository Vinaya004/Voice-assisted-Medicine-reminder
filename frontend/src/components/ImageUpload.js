import React, { useState } from "react";
import "../components/ImageUpload.css";
import axios from "axios";

const ImageUpload = ({ onExtractedData }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLoading(false);
      if (response.data.extracted_data) {
        onExtractedData(response.data.extracted_data);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default ImageUpload;
