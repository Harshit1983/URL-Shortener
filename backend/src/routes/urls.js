const express = require('express');

const { shortenUrl } = require('../controllers/urlControllers');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Create short URL
router.post('/shorten', optionalAuth, shortenUrl);

module.exports = router;