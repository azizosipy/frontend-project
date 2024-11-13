import React, { useState } from "react";
import PdfViewer from "./PdfViewer";

const Body = () => {
  const [file, setFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // Loading state
  const [title, setTitle] = useState(""); // New state for title
  const [description, setDescription] = useState(""); // New state for description

  // Handle file selection
  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(URL.createObjectURL(selectedFile)); // Create a URL for the selected file
      setIsFileUploaded(false); // Reset upload status when a new file is selected
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  // Function to send the file to the Django backend
  const uploadFile = async (file) => {
    setIsUploading(true); // Set loading to true when upload starts
    const formData = new FormData();
    formData.append("pdf_file", file); // Append the file to the FormData
    formData.append("title", title); // Add title to form data
    formData.append("description", description); // Add description to form data

    try {
      const response = await fetch("http://localhost:8000/upload_pdf/", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData, // Attach the FormData to the body of the request
      });

      if (response.ok) {
        const data = await response.json();
        console.log("File uploaded successfully:", data);
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
    if (title && description && file) {
      uploadFile(file); // Upload the file and send data to backend
    } else {
      alert("Please fill out all fields and upload a PDF.");
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

      {/* File Selection and Input Fields */}
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

      {/* Title and Description Fields */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded-md"
        ></textarea>
      </div>

      {/* Render PdfViewer component if file is selected */}
      {file && !isFileUploaded ? (
        <PdfViewer file={file} />
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
