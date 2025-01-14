import React from 'react';

const Controls = ({
  onImageUpload,
  onColorChange,
  onDownloadTxt,
  onDownloadPng,
  color,
}) => {
  return (
    <div className="controls">
      <div className="control-group">
        <input
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          id="imageUploader"
        />
      </div>

      <div className="control-group">
        <label htmlFor="colorPicker">ASCII Text Color:</label>
        <input
          type="color"
          id="colorPicker"
          value={color}
          onChange={onColorChange}
        />
      </div>

      <div className="control-group">
        <button onClick={onDownloadTxt}>Download ASCII (.txt)</button>
        <button onClick={onDownloadPng}>Download ASCII (.png)</button>
      </div>
    </div>
  );
};

export default Controls;
