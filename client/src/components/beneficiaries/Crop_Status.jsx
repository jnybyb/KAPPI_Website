import React from 'react';

const CropStatusTable = () => {
  // Simulate empty data state
  const cropStatusData = [];

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <div style={{ marginBottom: '0.3rem' }}>
        <h2 style={{ color: '#2c5530', marginBottom: '0.2rem', fontSize: '1.4rem' }}>Crop Status</h2>
        <p style={{ color: '#6c757d', margin: '0', fontSize: '0.60rem' }}>Survey results and crop health monitoring</p>
      </div>
      
      <div style={{ overflowX: 'auto', marginTop: '1rem', flex: '1', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {cropStatusData.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '3rem',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '1rem' }}>🌿</div>
            <h3 style={{ color: '#6c757d', marginBottom: '0.5rem', fontSize: '1.125rem' }}>No Data Available</h3>
            <p style={{ color: '#6c757d', margin: '0', fontSize: '0.875rem' }}>No crop status records found. Data will appear here once available.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CropStatusTable; 