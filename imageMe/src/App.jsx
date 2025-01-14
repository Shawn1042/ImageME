// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Correct imports if Home.jsx and MainApp.jsx are in the components folder
import Home from "./components/Home";
import MainApp from "./components/MainApp";

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;
