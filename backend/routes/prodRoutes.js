const express = require('express')
const {getProductList,putProducts,getProductDetails} = require('../controller/prodController')
const router = express.Router();

router.get('/',getProductList)
router.post('/prod',putProducts)
router.get('/:id',getProductDetails)

module.exports = router