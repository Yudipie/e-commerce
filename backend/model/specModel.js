const mongoose = require('mongoose');

const specificationsSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // 'Product' is the name of the model, not a direct reference to the model itself
        required: true,
    },
    engine: String,
    horsepower: Number,
    rating: Number,
    transmission: String,
    topSpeed: Number,
    zeroToSixty: Number,

    // other fields...
});

module.exports = mongoose.model("Specifications", specificationsSchema);
