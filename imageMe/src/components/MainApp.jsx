// src/components/MainApp.jsx (or wherever your main logic is)
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar"; 
import Controls from "./Controls";
import AsciiArtDisplay from "./AsciiArtDisplay";

const density = "@%#*+=-:. "; // Ordered from darkest to lightest

const MainApp = () => {
  const [asciiArt, setAsciiArt] = useState("");
  const [color, setColor] = useState("#00ffff");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // NEW: Keep track of canvas size
  const [canvasSize, setCanvasSize] = useState({ width: 200, height: 200 });

  // Handle color change
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  // NEW: Handle canvas size selection
  const handleCanvasSizeChange = (sizeString) => {
    // sizeString will be like "100x100", "200x200", etc.
    const [w, h] = sizeString.split("x").map(Number);
    setCanvasSize({ width: w, height: h });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    setError("");
    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        generateAsciiArt(img).finally(() => setIsLoading(false));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Generate ASCII Art
  const generateAsciiArt = async (image) => {
    const { width, height } = canvasSize; // Use the selected size

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(image, 0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    let ascii = "";
    // Typically, height might benefit from halving for aspect ratio, but it's optional.
    // For demonstration, we'll keep it as-is.
    for (let y = 0; y < height; y += 2) {
      for (let x = 0; x < width; x++) {
        const offset = (y * width + x) * 4;
        const r = data[offset];
        const g = data[offset + 1];
        const b = data[offset + 2];
        const a = data[offset + 3];

        if (a === 0) {
          ascii += " ";
          continue;
        }
        // Weighted luminance
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        const charIndex = Math.floor((luminance / 255) * (density.length - 1));
        const char = density.charAt(charIndex);
        ascii += char === " " ? " " : char;
      }
      ascii += "\n";
    }

    setAsciiArt(ascii);
  };

  // Download as .txt
  const downloadTxt = () => {
    if (!asciiArt) {
      alert("No ASCII art to download yet!");
      return;
    }
    const blob = new Blob([asciiArt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ascii-art.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Download as .png
  function downloadPng() {
    if (!asciiArt) {
      alert("No ASCII art to download yet!");
      return;
    }
  
    // 1) Increase the font size for clarity:
    const fontSize = 10;  
    const lineHeight = 10; 
    const fontFamily = "monospace";
    const textColor = colorPicker.value; // or from your state
    const bgColor = "#000";
  
    const lines = asciiArt.split("\n");
    let maxLineLength = 0;
    lines.forEach((line) => {
      if (line.length > maxLineLength) maxLineLength = line.length;
    });
  
    // 2) Basic monospace approximation
    const charWidth = fontSize * 0.6; 
    const canvasWidth = Math.ceil(maxLineLength * charWidth);
    const canvasHeight = lineHeight * lines.length;
  
    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = textColor;
  
    lines.forEach((line, i) => {
      const x = 0;
      const y = (i + 1) * lineHeight;
      ctx.fillText(line, x, y);
    });
  
    // 3) Download
    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "ascii-art.png";
    link.click();
  }
  

  // Handle Navbar button clicks (for the popup)
  const handleNavbarClick = (type) => {
    setPopupMessage("Accounts coming soon");
    setShowPopup(true);
  };

  // Auto-hide popup after 7 seconds
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="main-app">
      <Navbar onNavbarClick={handleNavbarClick} />

      {/* Popup Notification */}
      {showPopup && <div className="popup">{popupMessage}</div>}

      <div className="main-content">
        <Controls
          onImageUpload={handleImageUpload}
          onColorChange={handleColorChange}
          onDownloadTxt={downloadTxt}
          onDownloadPng={downloadPng}
          color={color}
          onCanvasSizeChange={handleCanvasSizeChange}
        />

        <AsciiArtDisplay asciiArt={asciiArt} color={color} isLoading={isLoading} />
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default MainApp;
