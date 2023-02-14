const express = require('express');
const router = express.Router();
const Zone = require('../../models/zone');

/**
 * @description This route is used to get all the zones in the system
 */

router.get('/', (req, res) => {
    Zone.find()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((_) => {
            res.status(500).send('Internal server error');
        });
});


module.exports = router;