const express = require('express');
const {authUser} = require('../middleware/auth')
const {getMylinks} = require('../controllers/linksController')
const router = express.Router();

router.get('/my-links',authUser,getMylinks)

module.exports = router;