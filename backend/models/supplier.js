/**
 * Supplier model
 * @fileoverview Supplier model
 * @author  < a href = "mailto:cinematicgenius007@gmail.com" > Cinematic Genius </ a >
 * @version 1.0.0
 * @module models/supplier
 * @requires mongoose
 * 
 * @description This module is used to define the schema for the supplier collection in the database
 */

const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        default: 'N/A'
    },
    phone: {
        type: Number,
        required: true,
        default: 0,
        integer: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;