import React from 'react';
import { Link } from 'react-router-dom';



const Navbar = ({ onNavbarClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-title">
        Image<span className="navbar-title-highlight">Me</span>
      </div>
      <div className="navbar-buttons">
          <Link to="/features">
            <button className="/features">Features Coming Soon</button>
          </Link>
        <button onClick={() => onNavbarClick('login')}>Login</button>
        <button onClick={() => onNavbarClick('signup')}>Signup</button>
      </div>
    </nav>
  );
};

export default Navbar;
