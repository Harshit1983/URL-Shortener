const express = require('express');

const { shortenUrl, redirectToUrl } = require('../controllers/urlControllers');
const { authUser } = require('../middleware/auth');

const router = express.Router();

// Create short URL
router.post('/shorten', authUser, shortenUrl);

// Redirect short URL
router.get('/:code', redirectToUrl);

module.exports = router;