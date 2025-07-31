import React, { useState } from 'react';
import AddBeneficiaryModal from './AddBeneficiaryModal';

const PersonalDetailsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [personalDetailsData, setPersonalDetailsData] = useState([]);

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

  const handleAddBeneficiary = (newBeneficiary) => {
    // Add the new beneficiary to the data
    setPersonalDetailsData(prev => [...prev, newBeneficiary]);
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ color: '#2c5530', marginBottom: '0.5rem' }}>Personal Details</h2>
          <p style={{ color: '#6c757d', margin: '0' }}>Beneficiary personal information and contact details</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            backgroundColor: 'var(--dark-green)',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = 'var(--dark-green)'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'var(--dark-green)'}
        >
          <span style={{ fontSize: '16px' }}>+</span>
          Add Beneficiary
        </button>
      </div>
      
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        {personalDetailsData.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '3rem',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '1rem' }}>📋</div>
            <h3 style={{ color: '#6c757d', marginBottom: '0.5rem' }}>No Data Available</h3>
            <p style={{ color: '#6c757d', margin: '0' }}>No beneficiary records found. Click "Add Beneficiary" to add new records.</p>
          </div>
        ) : (
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
        )}
      </div>

      {isModalOpen && (
        <AddBeneficiaryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddBeneficiary}
        />
      )}
    </div>
  );
};

export default PersonalDetailsTable; 