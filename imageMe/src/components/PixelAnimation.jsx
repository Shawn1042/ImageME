import React, { useEffect, useRef } from 'react';

const PixelAnimation = ({ src }) => {
  const canvasRef = useRef(null);
  const imgRef = useRef(new Image());
  const totalPixels = 1000; // Total number of pixels to reveal
  let revealedPixels = 0;

  useEffect(() => {
    imgRef.current.src = src;
    imgRef.current.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = imgRef.current.width;
      canvas.height = imgRef.current.height;
      ctx.drawImage(imgRef.current, 0, 0);
      animate(ctx);
    };
  }, [src]);

  const animate = (ctx) => {
    if (revealedPixels < totalPixels) {
      const x = Math.floor(Math.random() * imgRef.current.width);
      const y = Math.floor(Math.random() * imgRef.current.height);
      const pixelData = ctx.getImageData(x, y, 1, 1).data;

      if (pixelData[3] > 0) { // Check if the pixel is not transparent
        ctx.fillStyle = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, 1)`;
        ctx.fillRect(x, y, 1, 1);
        revealedPixels++;
      }
      setTimeout(() => animate(ctx), 10); // Adjust the timeout for speed
    }
  };

  return (
    <div className="home-image">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PixelAnimation;
