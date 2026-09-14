const express = require('express');
const {redirectToUrl} = require('../controllers/urlControllers')

const router = express.Router();

router.get('/:code',redirectToUrl)


module.exports = router;