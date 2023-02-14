/**
 * @fileoverview Zone model
 * @author  < a href = "mailto:cinematicgenius007@gmail.com" > Cinematic Genius </ a >
 * @version 1.0.0
 * @module models/zones
 * @requires mongoose
 * 
 * 
 * @description This module is used to define the schema for the zone collection in the database
 */

const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
    zone: {
        type: String,
        required: true,
        unique: true
    }
});

const Zone = mongoose.model('Zone', zoneSchema);

module.exports = Zone;