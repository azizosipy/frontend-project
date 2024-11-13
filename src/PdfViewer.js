import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PdfViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  // Handle the loading of the document and getting the total number of pages
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Go to the next page
  const goToNextPage = () => {
    if (pageNumber < numPages) setPageNumber(pageNumber + 1);
  };

  // Go to the previous page
  const goToPreviousPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto mt-6">
      {/* PDF Viewer Section */}
      <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js">
        <div
          className="relative border border-gray-200 rounded-lg overflow-hidden mb-4"
          onMouseEnter={() => setIsHovered(true)} // Set hover state to true
          onMouseLeave={() => setIsHovered(false)} // Set hover state to false
        >
          <Viewer
            fileUrl={file}
            onLoadSuccess={onDocumentLoadSuccess}
            initialPage={pageNumber - 1} // Zero-based page index for initialPage
          />

          {/* Analyzer Button centered on the page */}
          {isHovered && (
            <button
              className="absolute inset-0 flex items-center justify-center bg-red-500 text-white font-semibold rounded-full w-24 h-24 mx-auto transition duration-200"
              onClick={() => alert("Analyzer button clicked!")} // Replace with actual logic
            >
              Analyze
            </button>
          )}
        </div>
      </Worker>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          className="px-3 py-1 bg-blue-500 text-white font-semibold rounded-lg disabled:bg-gray-300 transition duration-200"
          disabled={pageNumber === 1}
          onClick={goToPreviousPage}
        >
          Previous
        </button>

        <span className="text-gray-700 font-medium">
          Page {pageNumber} of {numPages}
        </span>

        <button
          className="px-3 py-1 bg-blue-500 text-white font-semibold rounded-lg disabled:bg-gray-300 transition duration-200"
          disabled={pageNumber === numPages}
          onClick={goToNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;
