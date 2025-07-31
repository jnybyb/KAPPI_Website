# KAPPI Web Server

This is the backend server for the KAPPI Coffee Farm Monitoring System.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Beneficiaries
- `GET /api/beneficiaries` - Get all beneficiaries
- `GET /api/beneficiaries/:id` - Get single beneficiary
- `POST /api/beneficiaries` - Create new beneficiary
- `PUT /api/beneficiaries/:id` - Update beneficiary
- `DELETE /api/beneficiaries/:id` - Delete beneficiary

## Features
- MongoDB integration with Mongoose
- File upload support for profile pictures
- CORS enabled for frontend communication
- Input validation and error handling
- Automatic age calculation
- Unique beneficiary ID generation

## File Structure
```
server/
├── models/
│   └── Beneficiary.js
├── routes/
│   └── beneficiaries.js
├── uploads/          # Profile picture uploads
├── server.js
└── package.json
``` 