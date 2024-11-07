// model/prodModel.js
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    price: {
        type: Number,
        required: true, 
    },
    image: {
        type:String,
        required: true,
    },
    details: {
        type:String,
        required: true,
    },
    category: {
        type:String,
        required: true,
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps automatically
});

module.exports = mongoose.model("Product", productSchema);
