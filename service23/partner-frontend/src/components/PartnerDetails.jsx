// src/components/PartnerDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPartnerDetails } from '../services/api';

const PartnerDetails = () => {
  const { partnerId } = useParams();
  const [partner, setPartner] = useState(null);

  useEffect(() => {
    const getPartner = async () => {
      const res = await fetchPartnerDetails(partnerId);
      setPartner(res.data);
    };
    getPartner();
  }, [partnerId]);

  if (!partner) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{partner.name}</h2>
      <p className="text-muted">{partner.email}</p>
      <h5 className="text-success">Total Commission: ₹{partner.commission}</h5>

      <hr />
      <h4>Clients</h4>
      <ul className="list-group">
        {partner.clients.map((client, idx) => (
          <li className="list-group-item" key={idx}>
            {client.name} – {client.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PartnerDetails;
