// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PartnerList from './components/PartnerList';
import PartnerDetails from './components/PartnerDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PartnerList />} />
        <Route path="/partner/:partnerId" element={<PartnerDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
