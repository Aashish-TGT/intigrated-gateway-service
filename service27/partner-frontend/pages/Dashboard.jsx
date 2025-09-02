import React, { useState } from 'react';
import PartnerList from '../components/PartnerList';
import PartnerDetails from '../components/PartnerDetails';
import ExportButton from '../components/ExportButton';

const Dashboard = () => {
  const [selectedPartner, setSelectedPartner] = useState(null);

  return (
    <div className="dashboard">
      <h1>Partner Admin Dashboard</h1>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div>
          <PartnerList onSelect={setSelectedPartner} />
        </div>
        <div>
          {selectedPartner && (
            <>
              <PartnerDetails partnerId={selectedPartner} />
              <ExportButton partnerId={selectedPartner} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
