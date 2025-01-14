import React from 'react';

const Navbar = ({ onNavbarClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-title">
        Image<span className="navbar-title-highlight">Me</span>
      </div>
      <div className="navbar-buttons">
        <button onClick={() => onNavbarClick('login')}>Login</button>
        <button onClick={() => onNavbarClick('signup')}>Signup</button>
      </div>
    </nav>
  );
};

export default Navbar;
