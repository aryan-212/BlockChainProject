import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RegisterProperty from './pages/RegisterProperty';
import PropertyDetails from './pages/PropertyDetails';
import MyProperties from './pages/MyProperties';

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<RegisterProperty />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/my-properties" element={<MyProperties />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Web3ReactProvider>
  );
}

export default App; 