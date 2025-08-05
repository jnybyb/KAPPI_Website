const mongoose = require('mongoose');

// Seedling record schema for tracking coffee seedling distribution and planting
const seedlingRecordSchema = new mongoose.Schema({
  beneficiaryId: {
    type: String,
    required: true,
    trim: true,
    ref: 'Beneficiary'
  },
  received: {
    type: Number,
    required: true,
    min: 0
  },
  planted: {
    type: Number,
    required: true,
    min: 0
  },
  hectares: {
    type: Number,
    required: true,
    min: 0
  },
  dateOfPlanting: {
    type: Date,
    required: true
  },
  gps: {
    type: String, // GPS coordinates for farm location
    default: null,
    trim: true
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

// Virtual property to calculate planting efficiency percentage
seedlingRecordSchema.virtual('plantingEfficiency').get(function() {
  if (this.received === 0) return 0;
  return Math.round((this.planted / this.received) * 100);
});

// Pre-save middleware to ensure planted doesn't exceed received
seedlingRecordSchema.pre('save', function(next) {
  if (this.planted > this.received) {
    this.planted = this.received;
  }
  next();
});

module.exports = mongoose.model('SeedlingRecord', seedlingRecordSchema, 'seedlingRecords'); 