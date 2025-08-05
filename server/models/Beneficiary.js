const mongoose = require('mongoose');

// Beneficiary schema for coffee farm beneficiaries
const beneficiarySchema = new mongoose.Schema({
  beneficiaryId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  middleName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  purok: {
    type: String,
    required: true,
    trim: true
  },
  barangay: {
    type: String,
    required: true,
    trim: true
  },
  municipality: {
    type: String,
    required: true,
    trim: true
  },
  province: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  birthDate: {
    type: Date,
    required: true
  },
  maritalStatus: {
    type: String,
    required: true,
    enum: ['Single', 'Married', 'Widowed', 'Divorced', 'Separated']
  },
  cellphone: {
    type: String,
    required: true,
    trim: true,
    match: /^09\d{9}$/ // Philippine mobile number format
  },
  picture: {
    type: String, // URL to uploaded image
    default: null
  },
  age: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Virtual properties for computed fields
beneficiarySchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.middleName ? this.middleName + ' ' : ''}${this.lastName}`.trim();
});

beneficiarySchema.virtual('fullAddress').get(function() {
  return `${this.purok}, ${this.barangay}, ${this.municipality}, ${this.province}`;
});

// Instance method to calculate age from birth date
beneficiarySchema.methods.calculateAge = function() {
  const today = new Date();
  const birthDate = new Date(this.birthDate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Pre-save middleware to auto-calculate age
beneficiarySchema.pre('save', function(next) {
  if (this.birthDate) {
    this.age = this.calculateAge();
  }
  next();
});

module.exports = mongoose.model('Beneficiary', beneficiarySchema, 'beneficiaryPersonalDetails'); 