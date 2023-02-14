/**
 * @fileoverview Supplying Entity Model
 * @author  < a href = "mailto:cinematicgenius007@gmail.com" > Cinematic Genius </ a >
 * @version 1.0.0
 * @module models/supplyingEntity
 * @requires mongoose
 * 
 * @description This module is used to define the schema for the supplyingEntity collection in the database
 */

const mongoose = require('mongoose');

const supplyingEntitySchema = new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true,
        cascade: true
    },
    name: {
        type: String,
        required: true
    },
    zone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zone',
        required: true,
        cascade: true
    },
    date: {
        type: Date,
        default: Date.now
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
    }
});

const SupplyingEntity = mongoose.model('SupplyingEntity', supplyingEntitySchema);

module.exports = SupplyingEntity;