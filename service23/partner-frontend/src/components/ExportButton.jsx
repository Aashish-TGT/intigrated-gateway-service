import React from 'react';

const ExportButton = ({ partnerId }) => {
  const handleExport = () => {
    window.open(`/api/partner/${partnerId}/commission-report`, '_blank');
  };

  return (
    <button onClick={handleExport}>
      Export Commission Report
    </button>
  );
};

export default ExportButton;
