const express = require('express');
const router = express.Router();
const {checkRole} = require('../../middlewares/authentication');
const {Role, handleLogin, handleRegister} = require('../../utilities/authentication');
const ObjectId = require('mongodb').ObjectId;
const Distributor = require('../../models/distributor');
const DistributingEntity = require('../../models/distributingEntity');
const Item = require('../../models/item');


/**
 * @description This route is used to create a new user
 */

router.post('/auth/login', (req, res) => {
    handleLogin(req, res, Distributor, Role.DISTRIBUTOR);
});


/**
 * @description This route is used to create a new user
 */

router.post('/auth/register', (req, res) => {
    handleRegister(req, res, Distributor);
});


/**
 * @description This route is used to get the distributor details
 */

router.get('/details', checkRole(Role.DISTRIBUTOR), (req, res) => {
    Distributor.findOne({
        _id: ObjectId(req.user._id)
    })
        .then((result) => {
            result.password = undefined;
            res.status(200).send(result);
        })
        .catch((_err) => {
            res.status(500).send('Internal server error');
        });
});


/**
 * @description This route is used to update the distributor details
 */

router.put('/details', checkRole(Role.DISTRIBUTOR), (req, res) => {
    const {name, phone, address} = req.body;

    if (!name || !address || !phone) {
        res.status(400).send('Bad request');
    }

    Distributor.updateOne({
        _id: ObjectId(req.user._id)
    }, {
        $set: {
            name: name,
            phone: phone,
            address: address
        }
    })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((_err) => {
            res.status(500).send('Internal server error');
        });
});


/**
 * @description This route is used to get delete the distributor
 */

router.delete('/details', checkRole(Role.DISTRIBUTOR), (req, res) => {
    Distributor.deleteOne({
        _id: ObjectId(req.user._id)
    })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((_err) => {
            res.status(500).send('Internal server error');
        });
});


/**
 * @description This route is used to create a new distributing entity
 */

router.post('/distributingEntity', checkRole(Role.DISTRIBUTOR), (req, res) => {
    const {name, zone, phone, address} = req.body;

    if (!name || !zone || !phone || !address) {
        res.status(400).send('Bad request');
    }

    const newEntity = new DistributingEntity({
        name: name,
        distributor: ObjectId(req.user._id),
        zone: ObjectId(zone),
        phone: phone,
        address: address,
    });

    newEntity.save()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((_err) => {
            console.log(_err);
            res.status(500).send('Internal server error');
        });
});


/**
 * @description This route is used to update the distributing entity
 */

router.put('/distributingEntity', checkRole(Role.DISTRIBUTOR), (req, res) => {
    const {name, zone, phone, address, entityId} = req.body;

    if (!name || !zone || !phone || !address || !entityId) {
        res.status(400).send('Bad request');
    }

    DistributingEntity.updateOne({
        _id: ObjectId(entityId)
    }, {
        $set: {
            name: name,
            zone: ObjectId(zone),
            phone: phone,
            address: address
        }
    })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((_err) => {
            res.status(500).send('Internal server error');
        });
});


/**
 * @description This route is used to all the distributing entities
 */

router.get('/distributingEntities', checkRole(Role.DISTRIBUTOR), (req, res) => {
    DistributingEntity.find({
        distributor: ObjectId(req.user._id)
    })
        .populate('zone')
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((_err) => {
            res.status(500).send('Internal server error');
        });
});


/**
 * @description This route is used to get the distributing entity
 */

router.get('/distributingEntity/:id', checkRole(Role.DISTRIBUTOR), (req, res) => {
    const distributingEntityId = req.params.id;

    DistributingEntity.findOne({
        _id: ObjectId(distributingEntityId)
    })
        .populate('zone')
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((_err) => {
            res.status(500).send('Internal server error');
        });
});


/**
 * @description This route is used to delete the distributing entity
 */

router.delete('/distributingEntity/:id', checkRole(Role.DISTRIBUTOR), (req, res) => {
    const distributingEntityId = req.params.id;

    DistributingEntity.deleteOne({
        _id: ObjectId(distributingEntityId)
    })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((_err) => {
            res.status(500).send('Internal server error');
        });
});


/**
 * @description This route is used to get all the distribution items of a distributing entity
 */

router.get('/distributingEntity/:id/items', checkRole(Role.DISTRIBUTOR), (req, res) => {
    const distributingEntityId = req.params.id;

    Item.find({
        distributingEntity: ObjectId(distributingEntityId)
    })
        .populate('unit')
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((_) => {
            res.status(500).send('Internal server error');
        });
});


/**
 * @description This route is used to get the distribution item
 */

router.get('/item/:id', checkRole(Role.DISTRIBUTOR), (req, res) => {
    const itemId = req.params.id;

    Item.findOne({
        _id: ObjectId(itemId)
    })
        .populate('unit')
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((_err) => {
            res.status(500).send('Internal server error');
        });
});


/**
 * @description This route is used to create a new distribution item
 */

router.post('/item', checkRole(Role.DISTRIBUTOR), (req, res) => {
    const {distributingEntity, unit, price, maxCapacityPerDay} = req.body;

    if (!distributingEntity || !unit || !price || !maxCapacityPerDay) {
        res.status(400).send('Bad request');
    }

    const newEntity = new Item({
        distributingEntity: ObjectId(distributingEntity),
        unit: ObjectId(unit),
        price: price,
        maxCapacityPerDay: maxCapacityPerDay
    });

    newEntity.save()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((_err) => {
            res.status(500).send('Internal server error');
        });
});


/**
 * @description This route is used to update the distribution item
 */

router.put('/item/:id', checkRole(Role.DISTRIBUTOR), (req, res) => {
    const id = req.params.id;
    const {unit, price, maxCapacityPerDay} = req.body;

    if (!id || !unit || !price || !maxCapacityPerDay) {
        res.status(400).send('Bad request');
    }

    Item.updateOne({
        _id: ObjectId(id)
    }, {
        $set: {
            unit: ObjectId(unit),
            price: price,
            maxCapacityPerDay: maxCapacityPerDay
        }
    })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((_err) => {
            res.status(500).send('Internal server error');
        });
});


/**
 * @description This route is used to delete the distribution item
 */

router.delete('/item/:id', checkRole(Role.DISTRIBUTOR), (req, res) => {
    const id = req.params.id;

    Item.deleteOne({
        _id: ObjectId(id)
    })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((_err) => {
            res.status(500).send('Internal server error');
        });
});


module.exports = router;