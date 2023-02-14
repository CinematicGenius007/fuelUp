/**
 * @fileoverview Unit model
 * @author  < a href = "mailto:cinematicgenius007@gmail.com" > Cinematic Genius </ a >
 * @version 1.0.0
 * @module models/unit
 * @requires mongoose
 * 
 * @description This module is used to define the schema for the unit collection in the database
 */

const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    capacity: {
        type: Number,
        required: true,
        default: 14.2
    },
    type: {
        type: String,
        required: true,
        enum: ['domestic', 'industrial', 'commercial'],
        default: 'domestic'
    }
});

const Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;