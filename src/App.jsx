import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PlanTripStartPage from './pages/PlanTripStartPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/planTripStartPage" element={<PlanTripStartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
