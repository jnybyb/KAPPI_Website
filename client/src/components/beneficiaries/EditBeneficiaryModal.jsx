import React, { useState, useEffect, memo } from 'react';

// Reusable input field component - moved outside to prevent re-creation
const InputField = memo(({ 
  name, 
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  error 
}) => (
  <div>
    <label style={{
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '500',
      color: 'var(--black)',
      fontSize: '12px'
    }}>
      {label} {required && '*'}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        padding: '10px 12px',
        border: `1px solid ${error ? 'var(--red)' : 'var(--gray)'}`,
        borderRadius: '6px',
        fontSize: '12px',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s ease'
      }}
      placeholder={placeholder}
      className="modal-input-field"
    />
    {error && (
      <span style={{ color: 'var(--red)', fontSize: '11px', marginTop: '4px', display: 'block' }}>{error}</span>
    )}
  </div>
));

// Reusable select field component - moved outside to prevent re-creation
const SelectField = memo(({ 
  name, 
  label, 
  value, 
  onChange, 
  options, 
  required = false, 
  error 
}) => (
  <div>
    <label style={{
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '500',
      color: 'var(--black)',
      fontSize: '12px'
    }}>
      {label} {required && '*'}
    </label>
    <div style={{ position: 'relative' }}>
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '10px 32px 10px 12px',
          border: `1px solid ${error ? 'var(--red)' : 'var(--gray)'}`,
          borderRadius: '6px',
          fontSize: '12px',
          boxSizing: 'border-box',
          color: value ? 'var(--black)' : '#adb5bd',
          backgroundColor: 'white',
          height: '44px',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          appearance: 'none',
          transition: 'border-color 0.2s ease'
        }}
        className="custom-select-dropdown"
      >
        <option value="" disabled style={{ color: '#adb5bd' }}>Select {label.toLowerCase()}</option>
        {options.map(option => (
          <option key={option.value || option} value={option.value || option} style={{ color: 'var(--black)' }}>
            {option.label || option}
          </option>
        ))}
      </select>
      {/* Custom arrow icon */}
      <span style={{
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        color: '#6c757d',
        fontSize: '12px'
      }}>
        ▼
      </span>
    </div>
    {error && (
      <span style={{ color: 'var(--red)', fontSize: '11px', marginTop: '4px', display: 'block' }}>{error}</span>
    )}
  </div>
));

const EditBeneficiaryModal = ({ isOpen, onClose, onSubmit, beneficiary }) => {
  const [formData, setFormData] = useState({
    beneficiaryId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    purok: '',
    barangay: '',
    municipality: '',
    province: '',
    gender: '',
    birthDate: '',
    maritalStatus: '',
    cellphone: '',
    age: '',
    picture: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when beneficiary prop changes
  useEffect(() => {
    if (beneficiary) {
      setFormData({
        beneficiaryId: beneficiary.beneficiaryId || '',
        firstName: beneficiary.firstName || '',
        middleName: beneficiary.middleName || '',
        lastName: beneficiary.lastName || '',
        purok: beneficiary.purok || '',
        barangay: beneficiary.barangay || '',
        municipality: beneficiary.municipality || '',
        province: beneficiary.province || '',
        gender: beneficiary.gender || '',
        birthDate: beneficiary.birthDate ? beneficiary.birthDate.split('T')[0] : '',
        maritalStatus: beneficiary.maritalStatus || '',
        cellphone: beneficiary.cellphone || '',
        age: beneficiary.age || '',
        picture: null
      });
      setErrors({});
    }
  }, [beneficiary]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'picture' && files) {
      setFormData(prev => ({
        ...prev,
        picture: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Auto-calculate age when birth date changes
    if (name === 'birthDate' && value) {
      const age = calculateAge(value);
      setFormData(prev => ({
        ...prev,
        age: age.toString()
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.beneficiaryId.trim()) newErrors.beneficiaryId = 'Beneficiary ID is required';
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.purok.trim()) newErrors.purok = 'Purok is required';
    if (!formData.barangay.trim()) newErrors.barangay = 'Barangay is required';
    if (!formData.municipality.trim()) newErrors.municipality = 'Municipality is required';
    if (!formData.province.trim()) newErrors.province = 'Province is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.birthDate) newErrors.birthDate = 'Birth date is required';
    if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital status is required';
    if (!formData.cellphone.trim()) newErrors.cellphone = 'Cellphone number is required';

    // Age validation
    if (formData.age && (isNaN(formData.age) || formData.age < 0 || formData.age > 120)) {
      newErrors.age = 'Age must be a valid number between 0 and 120';
    }

    // Phone number validation
    if (formData.cellphone && !/^\d{11}$/.test(formData.cellphone.replace(/\s/g, ''))) {
      newErrors.cellphone = 'Please enter a valid 11-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateAge = (birthDateStr) => {
    const today = new Date();
    const birthDate = new Date(birthDateStr);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      handleClose();
    } catch (error) {
      console.error('Error updating beneficiary:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      beneficiaryId: '',
      firstName: '',
      middleName: '',
      lastName: '',
      purok: '',
      barangay: '',
      municipality: '',
      province: '',
      gender: '',
      birthDate: '',
      maritalStatus: '',
      cellphone: '',
      age: '',
      picture: null
    });
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          borderBottom: '1px solid #e8f5e8',
          paddingBottom: '1rem'
        }}>
          <h2 style={{
            margin: 0,
            color: '#2c5530',
            fontSize: '1.5rem',
            fontWeight: '600'
          }}>
            Edit Beneficiary
          </h2>
          <button
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6c757d',
              padding: '0.25rem',
              borderRadius: '4px',
              transition: 'color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.color = '#2c5530'}
            onMouseOut={(e) => e.target.style.color = '#6c757d'}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            {/* Personal Information Section */}
            <div style={{ gridColumn: '1 / -1' }}>
              <h3 style={{
                color: '#2c5530',
                fontSize: '1rem',
                marginBottom: '1rem',
                borderBottom: '1px solid #e8f5e8',
                paddingBottom: '0.5rem'
              }}>
                Personal Information
              </h3>
            </div>

            <InputField
              name="beneficiaryId"
              label="Beneficiary ID"
              value={formData.beneficiaryId}
              onChange={handleInputChange}
              placeholder="Enter beneficiary ID"
              required
              error={errors.beneficiaryId}
            />

            <InputField
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter first name"
              required
              error={errors.firstName}
            />

            <InputField
              name="middleName"
              label="Middle Name"
              value={formData.middleName}
              onChange={handleInputChange}
              placeholder="Enter middle name (optional)"
            />

            <InputField
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter last name"
              required
              error={errors.lastName}
            />

            <SelectField
              name="gender"
              label="Gender"
              value={formData.gender}
              onChange={handleInputChange}
              options={['Male', 'Female']}
              required
              error={errors.gender}
            />

            <InputField
              name="birthDate"
              label="Birth Date"
              value={formData.birthDate}
              onChange={handleInputChange}
              placeholder="YYYY-MM-DD"
              type="date"
              required
              error={errors.birthDate}
            />

            <InputField
              name="age"
              label="Age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Age"
              type="number"
              error={errors.age}
            />

            <SelectField
              name="maritalStatus"
              label="Marital Status"
              value={formData.maritalStatus}
              onChange={handleInputChange}
              options={['Single', 'Married', 'Widowed', 'Divorced']}
              required
              error={errors.maritalStatus}
            />

            <InputField
              name="cellphone"
              label="Cellphone Number"
              value={formData.cellphone}
              onChange={handleInputChange}
              placeholder="Enter 11-digit phone number"
              required
              error={errors.cellphone}
            />

            {/* Address Section */}
            <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
              <h3 style={{
                color: '#2c5530',
                fontSize: '1rem',
                marginBottom: '1rem',
                borderBottom: '1px solid #e8f5e8',
                paddingBottom: '0.5rem'
              }}>
                Address Information
              </h3>
            </div>

            <InputField
              name="purok"
              label="Purok"
              value={formData.purok}
              onChange={handleInputChange}
              placeholder="Enter purok"
              required
              error={errors.purok}
            />

            <InputField
              name="barangay"
              label="Barangay"
              value={formData.barangay}
              onChange={handleInputChange}
              placeholder="Enter barangay"
              required
              error={errors.barangay}
            />

            <InputField
              name="municipality"
              label="Municipality"
              value={formData.municipality}
              onChange={handleInputChange}
              placeholder="Enter municipality"
              required
              error={errors.municipality}
            />

            <InputField
              name="province"
              label="Province"
              value={formData.province}
              onChange={handleInputChange}
              placeholder="Enter province"
              required
              error={errors.province}
            />

            {/* Picture Upload */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: 'var(--black)',
                fontSize: '12px'
              }}>
                Profile Picture
              </label>
              <input
                type="file"
                name="picture"
                onChange={handleInputChange}
                accept="image/*"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--gray)',
                  borderRadius: '6px',
                  fontSize: '12px',
                  boxSizing: 'border-box'
                }}
              />
              <p style={{
                fontSize: '11px',
                color: '#6c757d',
                marginTop: '4px',
                marginBottom: '0'
              }}>
                Leave empty to keep current picture
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
            borderTop: '1px solid #e8f5e8',
            paddingTop: '1.5rem'
          }}>
            <button
              type="button"
              onClick={handleClose}
              style={{
                padding: '10px 20px',
                border: '1px solid #6c757d',
                borderRadius: '6px',
                backgroundColor: 'white',
                color: '#6c757d',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#6c757d';
                e.target.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = '#6c757d';
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: isSubmitting ? '#6c757d' : '#2c5530',
                color: 'white',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                fontSize: '12px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                if (!isSubmitting) {
                  e.target.style.backgroundColor = '#1e3a23';
                }
              }}
              onMouseOut={(e) => {
                if (!isSubmitting) {
                  e.target.style.backgroundColor = '#2c5530';
                }
              }}
            >
              {isSubmitting ? 'Updating...' : 'Update Beneficiary'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBeneficiaryModal; 