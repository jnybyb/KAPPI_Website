const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

// API service for beneficiaries
export const beneficiaryAPI = {
  // Get all beneficiaries
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/beneficiaries`);
    return handleResponse(response);
  },

  // Get single beneficiary by ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/beneficiaries/${id}`);
    return handleResponse(response);
  },

  // Create new beneficiary
  create: async (beneficiaryData) => {
    const formData = new FormData();
    
    // Add all form fields to FormData
    Object.keys(beneficiaryData).forEach(key => {
      if (key === 'picture' && beneficiaryData[key] instanceof File) {
        formData.append('picture', beneficiaryData[key]);
      } else if (beneficiaryData[key] !== null && beneficiaryData[key] !== undefined) {
        formData.append(key, beneficiaryData[key]);
      }
    });

    const response = await fetch(`${API_BASE_URL}/beneficiaries`, {
      method: 'POST',
      body: formData,
    });
    
    return handleResponse(response);
  },

  // Update beneficiary
  update: async (id, beneficiaryData) => {
    const formData = new FormData();
    
    // Add all form fields to FormData
    Object.keys(beneficiaryData).forEach(key => {
      if (key === 'picture' && beneficiaryData[key] instanceof File) {
        formData.append('picture', beneficiaryData[key]);
      } else if (beneficiaryData[key] !== null && beneficiaryData[key] !== undefined) {
        formData.append(key, beneficiaryData[key]);
      }
    });

    const response = await fetch(`${API_BASE_URL}/beneficiaries/${id}`, {
      method: 'PUT',
      body: formData,
    });
    
    return handleResponse(response);
  },

  // Delete beneficiary
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/beneficiaries/${id}`, {
      method: 'DELETE',
    });
    
    return handleResponse(response);
  }
};

// Error handling utility
export const handleAPIError = (error) => {
  console.error('API Error:', error);
  return {
    success: false,
    message: error.message || 'An error occurred while communicating with the server'
  };
}; 