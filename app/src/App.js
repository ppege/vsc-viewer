import './App.css';
import React from 'react'
import { Route, Routes } from "react-router-dom"
import WebApp from './pages/webapp.js'
import Home from './pages/home.js'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<WebApp />} />
    </Routes>
  );
}

export default App;
