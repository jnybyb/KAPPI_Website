import React, { useState, useEffect } from 'react';
import AddBeneficiaryModal from './AddBeneficiaryModal';
import AlertModal from '../AlertModal';
import Button from '../common/Button';
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
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = personalDetailsData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(personalDetailsData.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
        <div style={{ 
          width: '28px', 
          height: '28px', 
          borderRadius: '50%', 
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
          border: '2px solid #e8f5e8'
        }}>
          <img 
            src={`http://localhost:5000${beneficiary.picture}`} 
            alt="Profile" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover'
            }}
          />
        </div>
      ) : (
        <div style={{ 
          width: '28px', 
          height: '28px', 
          borderRadius: '50%', 
          backgroundColor: '#f8f9fa',
          border: '2px solid #e8f5e8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px'
        }}>
          👤
        </div>
      ),
      name: beneficiary.fullName || `${beneficiary.firstName} ${beneficiary.middleName ? beneficiary.middleName + ' ' : ''}${beneficiary.lastName}`.trim(),
      address: beneficiary.fullAddress || `${beneficiary.purok}, ${beneficiary.barangay}, ${beneficiary.municipality}, ${beneficiary.province}`,
      gender: beneficiary.gender,
      bDate: new Date(beneficiary.birthDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      age: beneficiary.age,
      status: beneficiary.maritalStatus,
      cellphone: beneficiary.cellphone
    };
  };

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
        <div>
          <h2 style={{ color: '#2c5530', marginBottom: '0.2rem', fontSize: '1.4rem' }}>Personal Details</h2>
          <p style={{ color: '#6c757d', margin: '0', fontSize: '0.60rem' }}>Beneficiary personal information and contact details</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          type="primary"
          size="medium"
          icon="+"
        >
          Add Beneficiary
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '1rem',
          border: '1px solid #f5c6cb',
          fontSize: '0.65rem'
        }}>
          {error}
        </div>
      )}
      
      <div style={{ overflowX: 'auto', marginTop: '1rem', flex: '1', overflowY: 'auto' }}>
        {loading ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '3rem',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '1rem' }}>⏳</div>
            <h3 style={{ color: '#6c757d', marginBottom: '0.5rem', fontSize: '1.125rem' }}>Loading...</h3>
            <p style={{ color: '#6c757d', margin: '0', fontSize: '0.875rem' }}>Please wait while we fetch the beneficiary data.</p>
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
            <h3 style={{ color: '#6c757d', marginBottom: '0.5rem', fontSize: '1.125rem' }}>No Data Available</h3>
            <p style={{ color: '#6c757d', margin: '0', fontSize: '0.875rem' }}>No beneficiary records found. Click "Add Beneficiary" to add new records.</p>
          </div>
        ) : (
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e8f5e8'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f8f0'}}>
                {columns.map((column, index) => (
                  <th key={index} style={{
                    padding: '8px 12px',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#2c5530',
                    borderBottom: '2px solid #2c5530',
                    fontSize: '0.65rem',
                    height: '32px'
                  }}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((beneficiary, rowIndex) => {
                const displayData = formatBeneficiaryForDisplay(beneficiary);
                return (
                  <tr key={beneficiary._id || rowIndex} style={{
                    borderBottom: '1px solid #e8f5e8',
                    transition: 'background-color 0.2s',
                    height: '28px',
                    backgroundColor: rowIndex % 2 === 0 ? '#fafdfa' : 'white'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f8f0'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = rowIndex % 2 === 0 ? '#fafdfa' : 'white'}>
                    {Object.values(displayData).map((cell, cellIndex) => (
                      <td key={cellIndex} style={{
                        padding: cellIndex === 1 ? '6px 8px 6px 16px' : cellIndex === 2 ? '6px 16px 6px 8px' : '6px 16px',
                        fontSize: '0.6rem',
                        color: '#495057',
                        height: '28px',
                        verticalAlign: 'middle'
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

      {/* Pagination - Always at bottom */}
      {!loading && personalDetailsData.length > 0 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '0.5rem',
          padding: '0.5rem',
          backgroundColor: 'white',
          borderTop: '0.5px solid rgba(36, 99, 59, 0.3)', // 30% opacity
          position: 'sticky',
          bottom: '0',
          flexShrink: 0
        }}>
          {/* Items info - bottom left */}
          <div style={{ fontSize: '0.65rem', color: '#6c757d' }}>
            Items {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, personalDetailsData.length)} of {personalDetailsData.length} entries
          </div>

          {/* Pagination controls - bottom right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              type="pagination"
              size="pagination"
            >
              &lt;
            </Button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => handlePageChange(page)}
                type={currentPage === page ? 'paginationActive' : 'pagination'}
                size="pagination"
                style={{ minWidth: '28px' }}
              >
                {page}
              </Button>
            ))}

            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              type="pagination"
              size="pagination"
            >
              &gt;
            </Button>
          </div>
        </div>
      )}

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