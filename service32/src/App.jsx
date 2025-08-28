import React from 'react';
import CarbonImpactDashboard from './components/CarbonImpactDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        🧾 Digital Receipts CO₂ Tracker
      </h1>
      <CarbonImpactDashboard />
    </div>
  );
}

export default App;
