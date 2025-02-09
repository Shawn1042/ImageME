import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MainApp from './components/MainApp';
import Features from './components/Features';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<MainApp />} />
        <Route path="/features" element={<Features />} />
      </Routes>
    </Router>
  );
}

export default App;
