/**
 * Item model
 * @fileoverview Item model
 * @author  < a href = "mailto:cinematicgenius007@gmail.com" > Cinematic Genius </ a >
 * @version 1.0.0
 * @module models/item
 * @requires mongoose
 * 
 * @description This module is used to define the schema for the item collection in the database which represents the lpg items that are being sold by the distributors
 */

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    distributingEntity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DistributingEntity',
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
    maxCapacityPerDay: {
        type: Number,
        required: true,
        default: 0
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;