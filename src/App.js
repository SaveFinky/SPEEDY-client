import './App.css';
//-----
import React from 'react';
import Navbar from './components/navbar/Navbar';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/'  element={<Home/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
