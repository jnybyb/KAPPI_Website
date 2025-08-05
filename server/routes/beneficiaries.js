const express = require('express');
const router = express.Router();
const Beneficiary = require('../models/Beneficiary');
const multer = require('multer');
const path = require('path');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// GET all beneficiaries
router.get('/', async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: beneficiaries,
      message: 'Beneficiaries retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching beneficiaries:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching beneficiaries',
      error: error.message
    });
  }
});

// GET single beneficiary by ID
router.get('/:id', async (req, res) => {
  try {
    const beneficiary = await Beneficiary.findById(req.params.id);
    if (!beneficiary) {
      return res.status(404).json({
        success: false,
        message: 'Beneficiary not found'
      });
    }
    res.json({
      success: true,
      data: beneficiary,
      message: 'Beneficiary retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching beneficiary:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching beneficiary',
      error: error.message
    });
  }
});

// POST create new beneficiary with image upload
router.post('/', upload.single('picture'), async (req, res) => {
  try {
    const {
      beneficiaryId,
      firstName,
      middleName,
      lastName,
      purok,
      barangay,
      municipality,
      province,
      gender,
      birthDate,
      maritalStatus,
      cellphone,
      age
    } = req.body;

    // Check for duplicate beneficiary ID
    const existingBeneficiary = await Beneficiary.findOne({ beneficiaryId });
    if (existingBeneficiary) {
      return res.status(400).json({
        success: false,
        message: 'Beneficiary ID already exists'
      });
    }

    // Handle image upload
    let pictureUrl = null;
    if (req.file) {
      pictureUrl = `/uploads/${req.file.filename}`;
    }

    const beneficiary = new Beneficiary({
      beneficiaryId,
      firstName,
      middleName,
      lastName,
      purok,
      barangay,
      municipality,
      province,
      gender,
      birthDate,
      maritalStatus,
      cellphone,
      age,
      picture: pictureUrl
    });

    await beneficiary.save();

    res.status(201).json({
      success: true,
      data: beneficiary,
      message: 'Beneficiary created successfully'
    });
  } catch (error) {
    console.error('Error creating beneficiary:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating beneficiary',
      error: error.message
    });
  }
});

// PUT update beneficiary with optional image upload
router.put('/:id', upload.single('picture'), async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      purok,
      barangay,
      municipality,
      province,
      gender,
      birthDate,
      maritalStatus,
      cellphone,
      age
    } = req.body;

    const updateData = {
      firstName,
      middleName,
      lastName,
      purok,
      barangay,
      municipality,
      province,
      gender,
      birthDate,
      maritalStatus,
      cellphone,
      age
    };

    // Handle image upload if provided
    if (req.file) {
      updateData.picture = `/uploads/${req.file.filename}`;
    }

    const beneficiary = await Beneficiary.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!beneficiary) {
      return res.status(404).json({
        success: false,
        message: 'Beneficiary not found'
      });
    }

    res.json({
      success: true,
      data: beneficiary,
      message: 'Beneficiary updated successfully'
    });
  } catch (error) {
    console.error('Error updating beneficiary:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating beneficiary',
      error: error.message
    });
  }
});

// DELETE beneficiary
router.delete('/:id', async (req, res) => {
  try {
    const beneficiary = await Beneficiary.findByIdAndDelete(req.params.id);
    
    if (!beneficiary) {
      return res.status(404).json({
        success: false,
        message: 'Beneficiary not found'
      });
    }

    res.json({
      success: true,
      message: 'Beneficiary deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting beneficiary:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting beneficiary',
      error: error.message
    });
  }
});

module.exports = router; 