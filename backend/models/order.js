/**
 * Order model
 * @fileoverview Order model
 * @author  < a href = "mailto:cinematicgenius007@gmail.com" > Cinematic Genius </ a >
 * @version 1.0.0
 * @module models/order
 * @requires mongoose
 * 
 * @description This module is used to define the schema for the order collection in the database
 */

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item', 
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'processing', 'delivered', 'cancelled'],
        default: 'pending'
    },
    surcharge: {
        type: Number,
        required: true,
        default: 0
    },
    tax: {
        type: Number, 
        required: true, 
        default: 0
    },
    total: {
        type: Number,
        required: true,
        default: 0
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;