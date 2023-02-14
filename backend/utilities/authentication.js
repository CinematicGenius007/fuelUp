/**
 * @fileoverview Authentication utility functions.
 * @exports {Object} Authentication utility functions.
 * @requires bcrypt
 * @requires jsonwebtoken
 * @requires config
 * @requires models/user
 * 
 * @description This module contains utility functions for authentication.
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const ObjectId = require('mongodb').ObjectId;


/**
 * @function hashPassword - Hashes a password.
 * @param {string} password - The password to be hashed.
 * @returns {Promise} The promise object containing the hashed password.
 */

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        if (!password) {
            reject(new Error('Password is required'));
        }
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                reject(err);
            }
            resolve(hash);
        });
    });
}


/**
 * @function comparePassword - Compares a password with a hashed password.
 * @param {string} password - The password to be compared.
 * @param {string} hashedPassword - The hashed password to be compared.
 * @returns {Promise} The promise object.
 * @throws {Error} If the passwords do not match.
 */

const comparePassword = (password, hashedPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, (err, result) => {
            if (err) {
                reject(err);
            }
            if (!result) {
                reject(new Error('Passwords do not match'));
            }
            resolve(result);
        });
    });
}


/**
 * @function generateToken - Generates a JWT token based on the user object.
 * @param {Object} user - The user object.
 * @returns {Promise} The promise object containing the generated token.
 */

const generateToken = (user) => {
    return new Promise((resolve, reject) => {
        if (!user) {
            reject(new Error('User object is required'));
        }
        const token = jwt.sign(user, config.get('jwtPrivateKey'));
        resolve(token);
    });
};


/**
 * @function verifyToken - Verifies a JWT token.
 * @param {string} token - The JWT token to be verified.
 * @returns {Promise} The promise object containing the decoded token.
 */

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            reject(new Error('Token is required'));
        }
        jwt.verify(token, config.get('jwtPrivateKey'), (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
};


/** 
 * @function validateUser - Validates a user object.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {boolean} True if the user object is valid, false otherwise.
*/

const validateUser = (email, password) => {
    return /^([a-zA-Z0-9]+|[a-zA-Z0-9][a-zA-Z0-9\._-]+[a-zA-Z0-9]+)?@[a-zA-Z0-9]+\.[A-Za-z]+(\.[A-Za-z]+)*$/.test(email) && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
};


const Role = {
    USER: config.get('role.user'),
    ADMIN: config.get('role.admin'),
    SUPPLIER: config.get('role.supplier'),
    DISTRIBUTOR: config.get('role.distributor'),
    SUPER_USER: config.get('role.superUser')
};


// Kind of a redirect for user login
const handleLogin = (req, res, collection, role) => {
    const {email, password} = req.body;
    if (!email || !password || !validateUser(email, password)) {
        return res.status(400).send('Bad Request');
    }

    collection.findOne({email: email})
        .then((user) => {
            if (!user) {
                return res.status(401).send('Unauthorized');
            }
            comparePassword(password, user.password)
                .then((result) => {
                    if (!result) {
                        return res.status(401).send('Unauthorized');
                    }
                    generateToken({_id: user._id.valueOf(), role: role})
                        .then((token) => {
                            res.status(200).send({token: token, user: { _id: user._id.valueOf(), role: role }});

                        }).catch((_err) => {
                            res.status(500).send('Internal Server Error');
                        });
                }).catch((_err) => {
                    res.status(500).send('Internal Server Error');
                });
        })
        .catch((_err) => {
            res.status(500).send('Internal Server Error');
        });
};


// Kind of a redirect for user registration
const handleRegister = (req, res, collection, isUser = false) => {
    const {
        email,
        password,
        name,
        zone,
        address,
        phone
    } = req.body;

    if (!email || !password || !name || !address || !phone || !validateUser(email, password)) {
        return res.status(400).send('Bad Request');
    }

    if (isUser && (!zone || !ObjectId.isValid(zone))) {
        return res.status(400).send('Bad Request');
    }

    collection.findOne({email: email})
        .then((user) => {
            if (user) {
                return res.status(400).send('Bad Request');
            }
            hashPassword(password)
                .then((hashedPassword) => {
                    const newUser = new collection({
                        name: name,
                        email: email,
                        password: hashedPassword,
                        zone: isUser ? ObjectId(zone) : null,
                        address: address,
                        phone: isNaN(phone) ? phone : parseInt(phone)
                    });
                    newUser.save()
                        .then((_result) => {
                            res.status(200).send('OK');
                        })
                        .catch((_err) => {
                            console.log(_err);
                            res.status(500).send('Internal Server Error');
                        });
                })
                .catch((_err) => {
                    console.log(_err);
                    res.status(500).send('Internal Server Error');
                });
        })
        .catch((_err) => {
            console.log(_err);
            res.status(500).send('Internal Server Error');
        });
};




// Export the functions

module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken,
    validateUser,
    Role,
    handleLogin,
    handleRegister,
};