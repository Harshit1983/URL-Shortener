const express = require('express');

const { shortenUrl, redirectToUrl } = require('../controllers/urlControllers');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Create short URL
router.post('/shorten', shortenUrl);

// Redirect short URL
router.get('/:code',optionalAuth, redirectToUrl);

module.exports = router;