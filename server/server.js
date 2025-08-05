const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const beneficiaryRoutes = require('./routes/beneficiaries');
const seedlingRecordRoutes = require('./routes/seedlingRecords');

app.use('/api/beneficiaries', beneficiaryRoutes);
app.use('/api/seedling-records', seedlingRecordRoutes);

// Example route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  // No need for useNewUrlParser or useUnifiedTopology in Mongoose 6+
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});