import React from 'react';

const SeedlingRecordsTable = () => {
  // Sample data for demonstration
  const seedlingRecordsData = [
    {
      bId: 'B001',
      coffeeSeedlingReceived: 500,
      coffeeSeedlingPlanted: 480,
      hectares: 2.5,
      datesOfPlanting: '2024-01-15',
      gps: '14.5995°N, 120.9842°E'
    },
    {
      bId: 'B002',
      coffeeSeedlingReceived: 300,
      coffeeSeedlingPlanted: 295,
      hectares: 1.8,
      datesOfPlanting: '2024-01-20',
      gps: '14.5995°N, 120.9842°E'
    },
    {
      bId: 'B003',
      coffeeSeedlingReceived: 400,
      coffeeSeedlingPlanted: 380,
      hectares: 2.0,
      datesOfPlanting: '2024-01-25',
      gps: '14.5995°N, 120.9842°E'
    }
  ];

  const columns = [
    'B_ID',
    'Coffee Seedling Received',
    'Coffee Seedling Planted',
    'Hectares',
    'Dates of Planting',
    'GPS'
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#2c5530', marginBottom: '1rem' }}>Seedling Records</h2>
      <p style={{ color: '#6c757d', marginBottom: '1rem' }}>Coffee seedling distribution and planting records</p>
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
            {seedlingRecordsData.map((row, rowIndex) => (
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

export default SeedlingRecordsTable; 