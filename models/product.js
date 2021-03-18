const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Float,
        required: true,
    },
    discount: {
        type: Number,
        required: false,
    }
});

module.exports = mongoose.model('Product', productSchema);