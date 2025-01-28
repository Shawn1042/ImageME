// src/components/Controls.jsx
import React, { useState } from "react";

const Controls = ({
  onImageUpload,
  onColorChange,
  onDownloadTxt,
  onDownloadPng,
  color,
  onCanvasSizeChange, // new prop
}) => {
  
  const [selectedSize, setSelectedSize] = useState("200x200");

  const handleSizeChange = (e) => {
    const size = e.target.value;
    setSelectedSize(size);
    onCanvasSizeChange(size);
  };

  return (
    <div className="controls">
      {/* File Upload */}
      <div className="control-group">
        <input type="file" accept="image/*" onChange={onImageUpload} />
      </div>

      {/* Color Picker */}
      <div className="control-group">
        <label htmlFor="colorPicker">ASCII Text Color:</label>
        <input type="color" id="colorPicker" value={color} onChange={onColorChange} />
      </div>

      {/* NEW: Canvas Size Dropdown */}
      <div className="control-group">
        <label htmlFor="canvasSizeSelect"> <h2>Features coming soon: </h2></label>
        <ul  style={{listStyle: "none"}}>
          <li style={{whiteSpace: "nowrap"}}> - ASCII Canvas Resize Options Coming Soon</li>
          <li> - Resizing Image</li>
          <li> - Better output of photo saved</li>
        </ul>
        
        {/* <select id="canvasSizeSelect" value={selectedSize} onChange={handleSizeChange}>
          <option value="100x100">100×100</option>
          <option value="200x200">200×200</option>
          <option value="400x400">400×400</option>
        </select> */}
      </div>

      {/* Download Buttons */}
      <div className="control-group">
        <button onClick={onDownloadTxt}>Download ASCII as a (.txt)</button>
        <button onClick={onDownloadPng}>Download ASCII as a (.png)</button>
      </div>
    </div>
  );
};

export default Controls;
