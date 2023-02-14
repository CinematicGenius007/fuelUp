// this is just a temp file for testing and filling the database

// Fill the database with the zones
const mongoose = require('mongoose');
require('dotenv').config();

console.log(process.env.MONGO_URI || 'mongodb://localhost:27017/fuelUp');

// connect to the database
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fuelUp', { useNewUrlParser: true, useUnifiedTopology: true })

// const Zone = require('./zone');
const Unit = require('./unit');


// Every type of lpg cylinder with different capacities
const units = [
    {
        capacity: 5,
        type: 'domestic'
    },
    {
        capacity: 14.2,
        type: 'domestic'
    },
    {
        capacity: 19,
        type: 'domestic'
    },
    {
        capacity: 14.2,
        type: 'industrial'
    },
    {
        capacity: 19,
        type: 'industrial'
    },
    {
        capacity: 14.2,
        type: 'commercial'
    },
    {
        capacity: 19,
        type: 'commercial'
    },
    {
        capacity: 45,
        type: 'commercial'
    },
    {
        capacity: 45,
        type: 'industrial'
    },
    {
        capacity: 425,
        type: 'commercial'
    },
    {
        capacity: 425,
        type: 'industrial'
    }
];

// function to fill the database with the units

// const fillUnits = async () => {
//     try {
//         await Unit.deleteMany({});
//         await Unit.insertMany(units);
//         console.log('Units added');
//     } catch (error) {
//         console.log(error);
//     }
// };

// fillUnits();

// array of zones (which are all the states and union territories of India)
const zones = [
    'Andaman and Nicobar Islands',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkand',
    'Karnataka',
    'Kerala',
    'Lakshadweep',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'
];

// function to fill the database with the zones
// const fillZones = async () => {
//     for (let i = 0; i < zones.length; i++) {
//         const zone = new Zone({
//             zone: zones[i]
//         });
//         await zone.save();
//     }
// }

// fill the database with the zones
// fillZones();


// Supplier Users
// let suppliers = [
//     {
//         "name": "HP Gas",
//         "email": "admin@hpcl.in",
//         "password": "tn45QkSJDS6F3y6s",
//         "address": "44 E. West Street Ashland, OH 44805",
//         "phone": 7477089812
//     }
// ];