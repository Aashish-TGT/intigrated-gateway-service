// src/components/PartnerList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPartners } from '../services/api';

const PartnerList = () => {
  const [partners, setPartners] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getPartners = async () => {
      const res = await fetchPartners();
      setPartners(res.data);
    };
    getPartners();
  }, []);

  const filtered = partners.filter((p) =>
    (p.name + p.email).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-3">All Partners</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="list-group">
        {filtered.map((partner) => (
          <div key={partner.partnerId} className="list-group-item">
            <h5>{partner.name}</h5>
            <p className="mb-1 text-muted">{partner.email}</p>
            <Link
              to={`/partner/${partner.partnerId}`}
              className="btn btn-sm btn-primary"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerList;
