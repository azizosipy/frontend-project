import React, { useState } from "react";
import PdfViewer from "./PdfViewer";
import "./index.css";
import Body from "./Repr.js";
import Header from "./Header";
import AlertS from "./alertS.js"; // Make sure to import AlertS with uppercase

function App() {
  return (
    <div className="App  font-mono">
      <Header />
      <AlertS /> {/* Use AlertS with uppercase */}
      <Body />
    </div>
  );
}

export default App;
