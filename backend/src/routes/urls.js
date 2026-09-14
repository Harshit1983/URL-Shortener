const express = require('express');

const { shortenUrl, redirectToUrl } = require('../controllers/urlControllers');


const router = express.Router();

// Create short URL
router.post('/shorten', shortenUrl);

// Redirect short URL
router.get('/:code', redirectToUrl);

module.exports = router;