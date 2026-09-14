const express = require('express');

const { shortenUrl, redirectToUrl } = require('../controllers/urlControllers');


const router = express.Router();

// Create short URL
router.post('/shorten', shortenUrl);


module.exports = router;