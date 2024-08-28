import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PlanTripStartPage from './pages/PlanTripStartPage';
import ClipStartPage from './pages/ClipStartPage.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/planTripStartPage" element={<PlanTripStartPage />} />
        <Route path="/clipStartPage" element={<ClipStartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
