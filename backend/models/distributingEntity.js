/**
 * @fileoverview Distributing Entity model
 * @author  < a href = "mailto:cinematicgenius007@gmail.com" > Cinematic Genius </ a >
 * @version 1.0.0
 * @module models/distributingEntity
 * @requires mongoose
 * 
 * @description This module is used to define the schema for the distributingEntity collection in the database
 */

const mongoose = require('mongoose');

const distributingEntitySchema = new mongoose.Schema({
    distributor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Distributor',
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

const DistributingEntity = mongoose.model('DistributingEntity', distributingEntitySchema);

module.exports = DistributingEntity;