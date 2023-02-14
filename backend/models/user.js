/**
 * @fileoverview User model
 * @author  < a href = "mailto:cinematicgenius007@gmail.com" > Cinematic Genius </ a >
 * @version 1.0.0
 * @module models/user
 * @requires mongoose
 * 
 * @description This module is used to define the schema for the user collection in the database
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    zone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zone',
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isSuperUser: {
        type: Boolean,
        required: true,
        default: false
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
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

const User = mongoose.model('User', userSchema);

module.exports = User;