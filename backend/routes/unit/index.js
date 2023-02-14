const express = require('express');
const router = express.Router();
const Unit = require('../../models/unit');

/**
 * @description This route is used to get all the units in the system
 */

router.get('/', (req, res) => {
    Unit.find()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((_err) => {
            res.status(500).send('Internal server error');
        });
});

module.exports = router;