javascript
const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');

// রেজিস্ট্রেশন রাউট
router.post('/register', registerUser);

module.exports = router;
