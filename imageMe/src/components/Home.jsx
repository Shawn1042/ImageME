// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import homeImage from '/mobspy.png';

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-content">
        <div className="home-text">
          <h2 className="home-title">Welcome to Image<span  style={{color: "crimson"}}>Me</span></h2>
          <p className="home-description">
            Transform your favorite images into stunning ASCII art effortlessly. 
            Upload an image, choose your preferred text color, and download your 
            unique ASCII creation in just a few clicks.
          </p>
          <Link to="/app">
            <button className="start-button">Get Started</button>
          </Link>
        </div>

        {/* Right-side image */}
        <div className="home-image">
          <img src={homeImage} alt="ASCII Art Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Home;
