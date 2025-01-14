// src/App.jsx
import React, { useState, useEffect } from 'react';
import Controls from './components/Controls';
import AsciiArtDisplay from './components/AsciiArtDisplay';
import './App.css';

const density = "@%#*+=-:. "; // Ordered from darkest to lightest

function App() {
  const [asciiArt, setAsciiArt] = useState('');
  const [color, setColor] = useState('#00ffff');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  // Handle color change
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }

    setError(''); // Clear previous errors
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
    const canvasWidth = 300;
    const canvasHeight = 300;

    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);

    const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    const data = imageData.data;

    let ascii = '';
    const aspectRatio = 0.5; // Adjust for better visual

    for (let y = 0; y < canvasHeight; y += 2) { // Step by 2 for aspect ratio
      for (let x = 0; x < canvasWidth; x++) {
        const offset = (y * canvasWidth + x) * 4;
        const r = data[offset];
        const g = data[offset + 1];
        const b = data[offset + 2];
        const a = data[offset + 3];

        if (a === 0) {
          ascii += ' ';
          continue;
        }

        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        const charIndex = Math.floor((luminance / 255) * (density.length - 1));
        const char = density.charAt(charIndex);

        ascii += char === ' ' ? ' ' : char;
      }
      ascii += '\n';
    }

    setAsciiArt(ascii);
  };

  // Download as .txt
  const downloadTxt = () => {
    if (!asciiArt) {
      alert('No ASCII art to download yet!');
      return;
    }
    const blob = new Blob([asciiArt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ascii-art.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Download as .png
  const downloadPng = () => {
    if (!asciiArt) {
      alert('No ASCII art to download yet!');
      return;
    }

    const lines = asciiArt.split('\n');
    const fontSize = 4; // px
    const lineHeight = 5; // px
    const fontFamily = 'monospace';
    const textColor = color;
    const bgColor = '#000';

    const maxLineLength = Math.max(...lines.map(line => line.length));
    const charWidth = fontSize * 0.6; // approximate for monospace
    const canvasWidth = Math.ceil(maxLineLength * charWidth);
    const canvasHeight = lineHeight * lines.length;

    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = textColor;

    lines.forEach((line, i) => {
      const x = 0;
      const y = (i + 1) * lineHeight;
      ctx.fillText(line, x, y);
    });

    const pngUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = 'ascii-art.png';
    link.click();
  };

  // Handle Navbar button clicks
  const handleNavbarClick = (type) => {
    setPopupMessage('Accounts coming soon');
    setShowPopup(true);
  };

  // Automatically hide popup after 7 seconds
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-title">ImageMe</div>
        <div className="navbar-buttons">
          <button onClick={() => handleNavbarClick('login')}>Login</button>
          <button onClick={() => handleNavbarClick('signup')}>Signup</button>
        </div>
      </nav>

      {/* Popup Notification */}
      {showPopup && <div className="popup">{popupMessage}</div>}

      {/* Main Content */}
      <div className="main-content">
        {/* Controls */}
        <Controls
          onImageUpload={handleImageUpload}
          onColorChange={handleColorChange}
          onDownloadTxt={downloadTxt}
          onDownloadPng={downloadPng}
          color={color}
        />

        {/* ASCII Art Display */}
        <AsciiArtDisplay asciiArt={asciiArt} color={color} isLoading={isLoading} />
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;
