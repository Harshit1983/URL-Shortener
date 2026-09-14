const express = require('express');
const { getMyLinks } = require('../controllers/linksController');
const { authUser } = require('../middleware/auth');

const router = express.Router();

router.get('/my-links', authUser, getMyLinks);

module.exports = router;