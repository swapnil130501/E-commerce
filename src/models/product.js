const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    color: {
        type: String
    },
    inStock: {
        type: Boolean,
        required: true
    }

}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;