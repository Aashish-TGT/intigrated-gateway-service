import React, { useState } from 'react';
import axios from 'axios';
import './ConsentForm.css'; // ✅ Use external CSS for styling

const ConsentForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    receiptId: '',
    thirdParty: '',
    purpose: '',
    expiry: ''
  });

  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/consent', formData);
      setToken(res.data.token);
      setError('');
    } catch (err) {
      console.error(err);
      setError('❌ Failed to generate token. Please check backend.');
    }
  };

  return (
    <div className="consent-container">
      <form onSubmit={handleSubmit} className="consent-form">
        <h2>🔐 Share Digital Receipt with Consent</h2>

        <label>User ID:</label>
        <input type="text" id="userId" value={formData.userId} onChange={handleChange} required />

        <label>Receipt ID:</label>
        <input type="text" id="receiptId" value={formData.receiptId} onChange={handleChange} required />

        <label>Third Party (e.g. HDFC Bank):</label>
        <input type="text" id="thirdParty" value={formData.thirdParty} onChange={handleChange} required />

        <label>Purpose (e.g. Home Loan):</label>
        <input type="text" id="purpose" value={formData.purpose} onChange={handleChange} required />

        <label>Consent Expiry Date:</label>
        <input type="date" id="expiry" value={formData.expiry} onChange={handleChange} required />

        <button type="submit">🚀 Generate Consent Token</button>
      </form>

      {error && <div className="error">{error}</div>}

      {token && (
        <div className="token-section">
          <h3>✅ Consent Token Generated</h3>
          <textarea readOnly rows="5" value={token}></textarea>
          <a href={`http://localhost:3001/access-receipt?token=${token}`} target="_blank" rel="noreferrer">
            Simulate Third-Party Access 🔗
          </a>
        </div>
      )}
    </div>
  );
};

export default ConsentForm;
