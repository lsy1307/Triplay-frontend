import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PlanTripStartPage from './pages/PlanTripStartPage';
import PlanTripPage from './pages/PlanTripPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/planTripStartPage" element={<PlanTripStartPage />} />
        <Route path="/planTripPage" element={<PlanTripPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
