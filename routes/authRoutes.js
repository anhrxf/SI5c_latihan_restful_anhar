const express = require('express');
const router = express.Router();
const c = require('../controllers/authController');

router.post('/register', c.register);

module.exports = router;