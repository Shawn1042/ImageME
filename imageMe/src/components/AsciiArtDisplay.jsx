// src/components/AsciiArtDisplay.jsx
import React from 'react';

const AsciiArtDisplay = ({ asciiArt, color, isLoading }) => {
  return (
    <div className="ascii-art-container">
      {isLoading ? (
        <p className="loading-message">Generating ASCII Art...</p>
      ) : (
        <pre className="ascii-art" style={{ color: color }}>
          {asciiArt}
        </pre>
      )}
    </div>
  );
};

export default AsciiArtDisplay;
