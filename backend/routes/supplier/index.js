const express = require('express');
const router = express.Router();
const {checkRole} = require('../../middlewares/authentication');
const {Role, handleLogin, handleRegister} = require('../../utilities/authentication');
const ObjectId = require('mongodb').ObjectId;
const Supplier = require('../../models/supplier');
const SupplyingEntity = require('../../models/supplyingEntity');
const Product = require('../../models/product');


/**
 * @description This route is used to create a new user
 */

router.post('/auth/login', (req, res) => {
    handleLogin(req, res, Supplier, Role.SUPPLIER);
});


/**
 * @description This route is used to create a new user
 */

router.post('/auth/register', (req, res) => {
    handleRegister(req, res, Supplier);
});


/**
 * @description This route is used to get the supplier details
 */

router.get('/details', checkRole(Role.SUPPLIER), (req, res) => {
    Supplier.findOne({
        _id: ObjectId(req.user._id)
    })
        .then((result) => {
            result.password = undefined;
            res.status(200).json(result);
        })
        .catch((_) => {
            res.status(500).send('Internal server error');
        });
});


/**
 * @description This route is used to update the supplier details
 */

router.put('/details', checkRole(Role.SUPPLIER), (req, res) => {
    const {name, phone, address} = req.body;

    if (!name || !address || !phone) {
        res.status(400).send('Bad request');
        return;
    }

    Supplier.findOneAndUpdate({
        _id: ObjectId(req.user._id),
    }, {
        $set: {
            name: name,
            address: address,
            phone: phone
        }
    })
        .then((_result) => {
            res.status(200).send('OK');
        })
        .catch((_err) => {
            res.status(500).send('Internal Server Error');
        });
});


/**
 * @description This route is used to delete the supplier
 */

router.delete('/details', checkRole(Role.SUPPLIER), (req, res) => {
    Supplier.findOneAndDelete({
        _id: ObjectId(req.user._id)
    })
        .then((_result) => {
            res.status(200).send('OK');
        })
        .catch((_err) => {
            res.status(500).send('Internal Server Error');
        });
});


/** 
 * @description This route is used to create new supplier entity
*/

router.post('/supplyingEntity', checkRole(Role.SUPPLIER), (req, res) => {
    const {name, zone, address, phone} = req.body;

    console.log(name, zone, address, phone);

    if (!name || !zone || !address || !phone) {
        res.status(400).send('Bad request');
        return;
    }

    const newSupplyingEntity = new SupplyingEntity({
        supplier: ObjectId(req.user._id),
        name: name,
        zone: ObjectId(zone),
        address: address,
        phone: isNaN(phone) ? phone : parseInt(phone)
    });

    newSupplyingEntity.save()
        .then((_result) => {
            res.status(200).send('OK');
        })
        .catch((_err) => {
            res.status(500).send('Internal Server Error');
        });
});


/**
 * @description This route is used to update the supplier entity. Only fields that can be updated are address, phone and zone.
 */

router.put('/supplyingEntity', checkRole(Role.SUPPLIER), (req, res) => {
    const {supplierEntityId, name, zone, address, phone} = req.body;

    if (!supplierEntityId || !name || !zone || !address || !phone) {
        res.status(400).send('Bad request');
        return;
    }

    SupplyingEntity.findOneAndUpdate({
        _id: ObjectId(supplierEntityId),
    }, {
        $set: {
            name: name,
            address: address,
            phone: phone,
            zone: ObjectId(zone)
        }
    })
        .then((_result) => {
            res.status(200).send('OK');
        })
        .catch((_err) => {
            res.status(500).send('Internal Server Error');
        });
});


/**
 * @description This route is used to get all the supplying entities of the supplier
 */

router.get('/supplyingEntities', checkRole(Role.SUPPLIER), (req, res) => {
    SupplyingEntity.find({
        supplier: ObjectId(req.user._id)
    })
        .populate('zone')
        // .toArray()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((_error) => {
            console.error(_error);
            res.status(500).send('Internal server error');
        });
});


/**
 * @description This route is used to get the supplying entity details
 */

router.get('/supplyingEntity/:id', checkRole(Role.SUPPLIER), (req, res) => {
    const supplierEntityId = req.params.id;

    SupplyingEntity.findOne({
        _id: ObjectId(supplierEntityId)
    })
        .populate('zone')
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((_) => {
            res.status(500).send('Internal server error');
        });
});


/**
 * @description This route is used to delete the supplying entity and all the items available in the inventory for that supplying entity
 */

router.delete('/supplyingEntity/:id', checkRole(Role.SUPPLIER), (req, res) => {
    const supplierEntityId = req.params.id;
    
    SupplyingEntity.findOneAndDelete({
        _id: ObjectId(supplierEntityId)
    })
        .then((_result) => {
            res.status(200).send('OK');
        })
        .catch((_err) => {
            res.status(500).send('Internal Server Error');
        });
});


/**
 * @description This route is used to get the products available in the inventory of the supplying entity
 */

router.get('/supplyingEntity/:id/products', checkRole(Role.SUPPLIER), (req, res) => {
    const supplierEntityId = req.params.id;

    Product.find({
        supplyingEntity: ObjectId(supplierEntityId)
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
 * @description This route is used to get the product details bundled with the unit details
 */

router.get('/product/:id', checkRole(Role.SUPPLIER), (req, res) => {
    const id = req.params.id;

    Product.findOne({
        _id: ObjectId(id)
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
 * @description This route is used to create new product in the inventory of the supplying entity
 */

router.post('/product', checkRole(Role.SUPPLIER), (req, res) => {
    const {supplyingEntity, unit, price, maxOutputPerDay} = req.body;

    if (!supplyingEntity || !unit || !price || !maxOutputPerDay) {
        res.status(400).send('Bad request');
        return;
    }

    const newProduct = new Product({
        supplyingEntity: ObjectId(supplyingEntity),
        unit: ObjectId(unit),
        price: price,
        maxOutputPerDay: maxOutputPerDay,
    });

    newProduct.save()
        .then((_result) => {
            res.status(200).send('OK');
        })
        .catch((_err) => {
            console.log(_err);
            res.status(500).send('Internal Server Error');
        });
});


/**
 * @description This route is used to update the product in the inventory of the supplying entity
 */

router.put('/product/:id', checkRole(Role.SUPPLIER), (req, res) => {
    const id = req.params.id;
    const {unitId, price, quantity} = req.body;

    if (!id || !unitId || !price || !quantity) {
        res.status(400).send('Bad request');
        return;
    }

    Product.findOneAndUpdate({
        _id: ObjectId(id),
    }, {
        $set: {
            unit: ObjectId(unitId),
            price: price,
            maxOutputPerDay: quantity,
        }
    })
        .then((_result) => {
            res.status(200).send('OK');
        })
        .catch((_err) => {
            res.status(500).send('Internal Server Error');
        });
});


/**
 * @description This route is used to delete the product from the inventory of the supplying entity
 */

router.delete('/product/:id', checkRole(Role.SUPPLIER), (req, res) => {
    const id = req.params.id;

    Product.deleteOne({
        _id: ObjectId(id)
    })
        .then((_result) => {
            res.status(200).send('OK');
        })
        .catch((_err) => {
            res.status(500).send('Internal Server Error');
        });
});


module.exports = router;