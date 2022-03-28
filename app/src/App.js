import './App.css';
import React from 'react'
import WebApp from './pages/webapp.js'
import Home from './pages/home.js'

function App() {
  if (localStorage.opened) {
    return (
      <WebApp />
    )
  }
  return (
    <Home />
  );
}

export default App;
