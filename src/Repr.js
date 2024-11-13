import React, { useState } from "react";
import PdfViewer from "./PdfViewer";
import axios from "axios"; // Import axios

const Body = () => {
  const [file, setFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // Loading state

  // Handle file selection
  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile); // Store the file itself, not the URL
      setIsFileUploaded(false); // Reset upload status when a new file is selected
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  // Function to send the file to the Django backend using axios
  const uploadFile = async (file) => {
    setIsUploading(true); // Set loading to true when upload starts
    const formData = new FormData();
    formData.append("file", file); // Append the file to the FormData

    try {
      // Using axios to send the POST request with form data
      const response = await axios.post(
        "http://127.0.0.1:8000/api/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type for file upload
          },
        }
      );

      if (response.status === 200) {
        console.log("File uploaded successfully:", response.data);
        setIsFileUploaded(true); // Set the file upload status to true
      } else {
        console.error("Failed to upload file.");
        alert("Failed to upload file. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading. Please try again.");
    } finally {
      setIsUploading(false); // Set loading to false when upload finishes
    }
  };

  // Function to handle the "Analyze" button click
  const handleAnalyzeClick = () => {
    if (file) {
      uploadFile(file); // Upload the file to the backend when clicked
    } else {
      alert("Please upload a PDF file first.");
    }
  };

  // Function to handle the Submit button click
  const handleSubmit = () => {
    if (file) {
      uploadFile(file); // Upload the file to the backend
    } else {
      alert("Please upload a PDF file.");
    }
  };

  return (
    <div className="App" style={{ padding: "20px" }}>
      {/* Upload and Submit Section at the top */}
      <div className="flex justify-center gap-4 mb-4">
        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-full"
            disabled={isUploading} // Disable the button when uploading
          >
            {isUploading ? "Submitting..." : "Submit"}
          </button>
        </div>

        {/* "Analyze" Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleAnalyzeClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-full"
            disabled={isUploading} // Disable the button when uploading
          >
            {isUploading ? "Uploading..." : "Analyze"}
          </button>
        </div>
      </div>

      {/* File Selection Section */}
      <div className="w-full py-9 bg-gray-50 rounded-2xl border border-gray-300 gap-3 grid border-dashed">
        <div className="grid gap-1">
          <svg
            className="mx-auto"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG Content */}
          </svg>
          <h2 className="text-center text-gray-400 text-xs leading-4">
            PNG, JPG or PDF, smaller than 15MB
          </h2>
        </div>
        <div className="grid gap-2">
          <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">
            Drag and Drop your file here or
          </h4>
          <div className="flex items-center justify-center">
            <label>
              <input
                type="file"
                accept="application/pdf"
                onChange={onFileChange}
                hidden
              />
              <div className="flex w-28 h-9 px-2 flex-col bg-indigo-600 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
                Choose File
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Render PdfViewer component if file is selected */}
      {file && !isFileUploaded ? (
        <PdfViewer file={URL.createObjectURL(file)} /> // Pass the URL for rendering
      ) : (
        <p>Please upload and analyze the file.</p>
      )}

      {/* Show message if file is uploaded */}
      {isFileUploaded && (
        <div className="mt-4 text-center text-green-500">
          File uploaded successfully! You can now analyze it.
        </div>
      )}
    </div>
  );
};

export default Body;
