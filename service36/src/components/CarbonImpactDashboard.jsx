import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CarbonImpactDashboard = ({ businessId = 'books4all' }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/report/${businessId}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, [businessId]);

  const handleExport = () => {
    window.open(`http://localhost:5000/report/${businessId}/export`, '_blank');
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🌱 Carbon Impact Dashboard</h2>

      <table className="w-full border border-gray-300 dark:border-gray-600">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-left">
            <th className="p-2">Month</th>
            <th className="p-2">Receipts</th>
            <th className="p-2">Saved CO₂ (grams)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, idx) => (
            <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-2">{entry.month}</td>
              <td className="p-2">{entry.receiptCount}</td>
              <td className="p-2">{entry.savedCO2}g</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleExport}
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        📥 Download CSV Report
      </button>
    </div>
  );
};

export default CarbonImpactDashboard;
