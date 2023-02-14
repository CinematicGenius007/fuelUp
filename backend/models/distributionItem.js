/**
 * @fileoverview DistributionItem model definition.
 * @author  < a href = "mailto:cinematicgenius007@gmail.com" > Cinematic Genius </ a >
 * @version 1.0.0
 * @module models/distributionItem
 * @requires mongoose
 * 
 * @description This module is used to define the schema for the distributionItem collection in the database which represents the items that are being distributed by the distributing entities.
 */

const mongoose = require('mongoose');

const distributionItemSchema = new mongoose.Schema({
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

const DistributionItem = mongoose.model('DistributionItem', distributionItemSchema);

module.exports = DistributionItem;