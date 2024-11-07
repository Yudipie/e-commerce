const express = require('express');
const { getSpecificationsByProductId } = require('../controller/specController');
const router = express.Router();

// Route to get specifications by product ID
router.get('/:id', getSpecificationsByProductId);

module.exports = router;
