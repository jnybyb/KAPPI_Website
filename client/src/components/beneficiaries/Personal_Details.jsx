import React from 'react';

const PersonalDetailsTable = () => {
  // Sample data for demonstration
  const personalDetailsData = [
    {
      beneficiaryId: 'B001',
      picture: '👤',
      name: 'Juan Dela Cruz',
      address: 'Barangay San Jose, Municipality A',
      gender: 'Male',
      bDate: '1985-03-15',
      age: 38,
      status: 'Active',
      cellphone: '09123456789'
    },
    {
      beneficiaryId: 'B002',
      picture: '👤',
      name: 'Maria Santos',
      address: 'Barangay San Pedro, Municipality B',
      gender: 'Female',
      bDate: '1990-07-22',
      age: 33,
      status: 'Active',
      cellphone: '09234567890'
    },
    {
      beneficiaryId: 'B003',
      picture: '👤',
      name: 'Pedro Reyes',
      address: 'Barangay San Miguel, Municipality C',
      gender: 'Male',
      bDate: '1978-11-08',
      age: 45,
      status: 'Inactive',
      cellphone: '09345678901'
    }
  ];

  const columns = [
    'Beneficiary ID',
    'Picture',
    'Name',
    'Address',
    'Gender',
    'BDate',
    'Age',
    'Status',
    'Cellphone'
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#2c5530', marginBottom: '1rem' }}>Personal Details</h2>
      <p style={{ color: '#6c757d', marginBottom: '1rem' }}>Beneficiary personal information and contact details</p>
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
            {personalDetailsData.map((row, rowIndex) => (
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

export default PersonalDetailsTable; 