const {verifyToken} = require('../utilities/authentication');


/**
 * @description This route is used to check for the token in the request header and populate the request object with the user object 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const tokenValidation = (req, _, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        verifyToken(req.headers.authorization.split(' ')[1])
            .then((user) => {
                req.user = user;
                next();
            }).catch((_) => {
                req.user = undefined;
                next();
            });
    } else {
        req.user = undefined;
        next();
    }
};


/**
 * @description This function is used to check the role of the user and authorize the user based on the role
 * @param {*} role
 */
const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next();
        } else {
            res.status(403).send('Forbidden');
        }
    };
};


module.exports = {
    tokenValidation,
    checkRole
};