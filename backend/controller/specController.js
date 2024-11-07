const asyncHandler = require('express-async-handler')
const Specifications = require('../model/specModel');

const getSpecificationsByProductId = asyncHandler(async (req, res) => {
    try {
        const specifications = await Specifications.findOne({ product: req.params.productId })
            .populate('product'); // Populate the product details

        if (!specifications) {
            return res.status(404).json({ message: 'Specifications not found' });
        }

        res.json(specifications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = { getSpecificationsByProductId }
