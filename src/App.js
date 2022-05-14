import './App.css';
//-----
import React from 'react';
import Navbar from './components/navbar/Navbar';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Employees from './components/pages/Employees';

function App() {

  return (
    
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/'  element={<Home/>} />
          <Route exact path='/Employees' element={<Employees/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

