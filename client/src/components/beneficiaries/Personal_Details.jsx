import React, { useState, useEffect } from 'react';
import AddBeneficiaryModal from './AddBeneficiaryModal';
import AlertModal from '../AlertModal';
import { beneficiaryAPI, handleAPIError } from '../../services/api';

const PersonalDetailsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    type: 'success',
    title: '',
    message: ''
  });
  const [personalDetailsData, setPersonalDetailsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Fetch beneficiaries from API
  const fetchBeneficiaries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await beneficiaryAPI.getAll();
      setPersonalDetailsData(response.data);
    } catch (err) {
      const errorData = handleAPIError(err);
      setError(errorData.message);
      console.error('Error fetching beneficiaries:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load beneficiaries on component mount
  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const handleAddBeneficiary = async (newBeneficiary) => {
    try {
      // Prepare data for API - now using individual fields
      const apiData = {
        beneficiaryId: newBeneficiary.beneficiaryId,
        firstName: newBeneficiary.firstName,
        middleName: newBeneficiary.middleName,
        lastName: newBeneficiary.lastName,
        purok: newBeneficiary.purok,
        barangay: newBeneficiary.barangay,
        municipality: newBeneficiary.municipality,
        province: newBeneficiary.province,
        gender: newBeneficiary.gender,
        birthDate: newBeneficiary.birthDate,
        maritalStatus: newBeneficiary.maritalStatus,
        cellphone: newBeneficiary.cellphone,
        age: newBeneficiary.age,
        picture: newBeneficiary.picture instanceof File ? newBeneficiary.picture : null
      };

      // Send to API
      const response = await beneficiaryAPI.create(apiData);
      
      // Refresh the data
      await fetchBeneficiaries();
      
      // Show success message using AlertModal
      setAlertModal({
        isOpen: true,
        type: 'success',
        title: 'Success',
        message: 'Beneficiary has been added successfully.'
      });
    } catch (err) {
      const errorData = handleAPIError(err);
      setError(errorData.message);
      console.error('Error adding beneficiary:', err);
      
      // Show error message using AlertModal
      setAlertModal({
        isOpen: true,
        type: 'error',
        title: 'Failed',
        message: errorData.message || 'Failed to add beneficiary. Please try again.'
      });
    }
  };

  // Handle alert modal close and then close AddBeneficiary modal
  const handleAlertClose = () => {
    setAlertModal({ ...alertModal, isOpen: false });
    // Close AddBeneficiary modal after alert closes
    setTimeout(() => {
      setIsModalOpen(false);
    }, 100);
  };

  // Format data for display
  const formatBeneficiaryForDisplay = (beneficiary) => {
    return {
      beneficiaryId: beneficiary.beneficiaryId,
      picture: beneficiary.picture ? (
        <img 
          src={`http://localhost:5000${beneficiary.picture}`} 
          alt="Profile" 
          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
        />
      ) : '👤',
      name: beneficiary.fullName || `${beneficiary.firstName} ${beneficiary.middleName ? beneficiary.middleName + ' ' : ''}${beneficiary.lastName}`.trim(),
      address: beneficiary.fullAddress || `${beneficiary.purok}, ${beneficiary.barangay}, ${beneficiary.municipality}, ${beneficiary.province}`,
      gender: beneficiary.gender,
      bDate: new Date(beneficiary.birthDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      age: beneficiary.age,
      status: beneficiary.maritalStatus,
      cellphone: beneficiary.cellphone
    };
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
          onMouseOver={(e) => e.target.style.backgroundColor = 'var(--emerald-green)'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'var(--dark-green)'}
        >
          <span style={{ fontSize: '16px' }}>+</span>
          Add Beneficiary
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '12px',
          borderRadius: '4px',
          marginBottom: '1rem',
          border: '1px solid #f5c6cb'
        }}>
          {error}
        </div>
      )}
      
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        {loading ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '3rem',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '1rem' }}>⏳</div>
            <h3 style={{ color: '#6c757d', marginBottom: '0.5rem' }}>Loading...</h3>
            <p style={{ color: '#6c757d', margin: '0' }}>Please wait while we fetch the beneficiary data.</p>
          </div>
        ) : personalDetailsData.length === 0 ? (
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
              {personalDetailsData.map((beneficiary, rowIndex) => {
                const displayData = formatBeneficiaryForDisplay(beneficiary);
                return (
                  <tr key={beneficiary._id || rowIndex} style={{
                    borderBottom: '1px solid #dee2e6',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                    {Object.values(displayData).map((cell, cellIndex) => (
                      <td key={cellIndex} style={{
                        padding: '12px 16px',
                        fontSize: '14px',
                        color: '#495057'
                      }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                );
              })}
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

      {/* Alert Modal */}
      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={handleAlertClose}
        type={alertModal.type}
        title={alertModal.title}
        message={alertModal.message}
        autoClose={true}
        autoCloseDelay={3000}
      />
    </div>
  );
};

export default PersonalDetailsTable; 