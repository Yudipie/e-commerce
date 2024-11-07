const express = require('express')
const router = express.Router();
const { createCheckoutSession } = require('../controller/checkoutController');

router.post('/',createCheckoutSession)

module.exports = router;