/**
 * @fileoverview Product model
 * @author  < a href = "mailto:cinematicgenius007@gmail.com" > Cinematic Genius </ a >
 * @version 1.0.0
 * @module models/product
 * @requires mongoose
 * 
 * @description This module is used to define the schema for the product collection in the database which represents the lpg products that are being sold by the distributors
 */

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    supplyingEntity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SupplyingEntity',
        required: true,
        cascade: true
    },
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
        required: true,
        cascade: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    maxOutputPerDay: {
        type: Number,
        required: true,
        default: 100
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;