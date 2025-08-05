const express = require('express');
const router = express.Router();
const SeedlingRecord = require('../models/SeedlingRecord');
const Beneficiary = require('../models/Beneficiary');

// GET all seedling records
router.get('/', async (req, res) => {
  try {
    const seedlingRecords = await SeedlingRecord.find()
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: seedlingRecords
    });
  } catch (error) {
    console.error('Error fetching seedling records:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch seedling records'
    });
  }
});

// GET single seedling record by ID
router.get('/:id', async (req, res) => {
  try {
    const seedlingRecord = await SeedlingRecord.findById(req.params.id);
    
    if (!seedlingRecord) {
      return res.status(404).json({
        success: false,
        message: 'Seedling record not found'
      });
    }
    
    res.json({
      success: true,
      data: seedlingRecord
    });
  } catch (error) {
    console.error('Error fetching seedling record:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch seedling record'
    });
  }
});

// GET seedling records by beneficiary ID
router.get('/beneficiary/:beneficiaryId', async (req, res) => {
  try {
    const seedlingRecords = await SeedlingRecord.find({
      beneficiaryId: req.params.beneficiaryId
    }).sort({ dateOfPlanting: -1 });
    
    res.json({
      success: true,
      data: seedlingRecords
    });
  } catch (error) {
    console.error('Error fetching seedling records by beneficiary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch seedling records for beneficiary'
    });
  }
});

// POST create new seedling record
router.post('/', async (req, res) => {
  try {
    const { beneficiaryId, received, planted, hectares, dateOfPlanting, gps } = req.body;
    
    // Validate required fields
    if (!beneficiaryId || !received || !planted || !hectares || !dateOfPlanting) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }
    
    // Verify beneficiary exists
    const beneficiary = await Beneficiary.findOne({ beneficiaryId });
    if (!beneficiary) {
      return res.status(400).json({
        success: false,
        message: 'Beneficiary not found'
      });
    }
    
    // Validate numeric values
    if (received < 0 || planted < 0 || hectares < 0) {
      return res.status(400).json({
        success: false,
        message: 'Values cannot be negative'
      });
    }
    
    // Ensure planted doesn't exceed received
    if (planted > received) {
      return res.status(400).json({
        success: false,
        message: 'Planted seedlings cannot exceed received seedlings'
      });
    }
    
    const seedlingRecord = new SeedlingRecord({
      beneficiaryId,
      received: parseInt(received),
      planted: parseInt(planted),
      hectares: parseFloat(hectares),
      dateOfPlanting: new Date(dateOfPlanting),
      gps: gps || null
    });
    
    await seedlingRecord.save();
    
    res.status(201).json({
      success: true,
      message: 'Seedling record created successfully',
      data: seedlingRecord
    });
  } catch (error) {
    console.error('Error creating seedling record:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create seedling record'
    });
  }
});

// PUT update seedling record
router.put('/:id', async (req, res) => {
  try {
    const { beneficiaryId, received, planted, hectares, dateOfPlanting, gps } = req.body;
    
    // Validate required fields
    if (!beneficiaryId || !received || !planted || !hectares || !dateOfPlanting) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }
    
    // Verify beneficiary exists
    const beneficiary = await Beneficiary.findOne({ beneficiaryId });
    if (!beneficiary) {
      return res.status(400).json({
        success: false,
        message: 'Beneficiary not found'
      });
    }
    
    // Validate numeric values
    if (received < 0 || planted < 0 || hectares < 0) {
      return res.status(400).json({
        success: false,
        message: 'Values cannot be negative'
      });
    }
    
    // Ensure planted doesn't exceed received
    if (planted > received) {
      return res.status(400).json({
        success: false,
        message: 'Planted seedlings cannot exceed received seedlings'
      });
    }
    
    const seedlingRecord = await SeedlingRecord.findByIdAndUpdate(
      req.params.id,
      {
        beneficiaryId,
        received: parseInt(received),
        planted: parseInt(planted),
        hectares: parseFloat(hectares),
        dateOfPlanting: new Date(dateOfPlanting),
        gps: gps || null,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );
    
    if (!seedlingRecord) {
      return res.status(404).json({
        success: false,
        message: 'Seedling record not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Seedling record updated successfully',
      data: seedlingRecord
    });
  } catch (error) {
    console.error('Error updating seedling record:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update seedling record'
    });
  }
});

// DELETE seedling record
router.delete('/:id', async (req, res) => {
  try {
    const seedlingRecord = await SeedlingRecord.findByIdAndDelete(req.params.id);
    
    if (!seedlingRecord) {
      return res.status(404).json({
        success: false,
        message: 'Seedling record not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Seedling record deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting seedling record:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete seedling record'
    });
  }
});

module.exports = router; 