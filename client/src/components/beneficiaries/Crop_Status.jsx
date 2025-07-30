import React from 'react';

const CropStatusTable = () => {
  // Sample data for demonstration
  const cropStatusData = [
    {
      surveyDate: '2024-03-15',
      surveyer: 'John Smith',
      bId: 'B001',
      pictures: '📷',
      numberAlive: 450,
      numberDead: 30
    },
    {
      surveyDate: '2024-03-16',
      surveyer: 'Jane Doe',
      bId: 'B002',
      pictures: '📷',
      numberAlive: 280,
      numberDead: 15
    },
    {
      surveyDate: '2024-03-17',
      surveyer: 'Mike Johnson',
      bId: 'B003',
      pictures: '📷',
      numberAlive: 350,
      numberDead: 30
    }
  ];

  const columns = [
    'Survey Date',
    'Surveyer',
    'B_ID',
    'Pictures',
    'Number of Alive',
    'Number of Dead'
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#2c5530', marginBottom: '1rem' }}>Crop Status</h2>
      <p style={{ color: '#6c757d', marginBottom: '1rem' }}>Survey results and crop health monitoring</p>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              {columns.map((column, index) => (
                <th key={index} style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#495057',
                  borderBottom: '2px solid #dee2e6',
                  fontSize: '14px'
                }}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cropStatusData.map((row, rowIndex) => (
              <tr key={rowIndex} style={{
                borderBottom: '1px solid #dee2e6',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                {Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex} style={{
                    padding: '12px 16px',
                    fontSize: '14px',
                    color: '#495057'
                  }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CropStatusTable; 