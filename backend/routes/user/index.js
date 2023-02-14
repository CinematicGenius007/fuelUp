const express = require('express');
const router = express.Router();
const {checkRole} = require('../../middlewares/authentication');
const {Role, handleLogin, handleRegister} = require('../../utilities/authentication');
const ObjectId = require('mongodb').ObjectId;
const User = require('../../models/user');
const Order = require('../../models/order');
const SupplyingEntity = require('../../models/supplyingEntity');
const Product = require('../../models/product');
const DistributingEntity = require('../../models/distributingEntity');
const Item = require('../../models/item');
const Unit = require('../../models/unit');

const {
    calculateProductScore,
    calculateItemScore,
} = require('../../utilities/orders');

/**
 * @description This route is used to create a new user
 */

router.post('/auth/login', (req, res) => {
    handleLogin(req, res, User, Role.USER);
});


/**
 * @description This route is used to create a new user
 */

router.post('/auth/register', (req, res) => {
    handleRegister(req, res, User, true);
});


/**
 * @description This route is used to get the user details
 */

router.get('/details', checkRole(Role.USER), (req, res) => {
    User.findOne({
        _id: ObjectId(req.user._id)
    })
        .populate('zone')
        .then((result) => {
            result.password = undefined;
            res.status(200).send(result);
        })
        .catch((_err) => {
            res.status(500).send('Internal server error');
        });
});


/**
 * @description This route is used to update the user details
 */

router.put('/details', checkRole(Role.USER), (req, res) => {
    const {name, phone, address} = req.body;

    if (!name || !phone || !address) {
        res.status(400).send('Bad request');
        return;
    }

    User.findOneAndUpdate({
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
 * @description This route is used to delete the user
 */

router.delete('/details', checkRole(Role.USER), (req, res) => {
    User.findOneAndDelete({
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
 * @description This route is used to get all orders placed by the user for the given month, year (current month and year by default) which is passed as query parameters) sorted by date
 */

router.get('/orders', checkRole(Role.USER), async (req, res) => {
    /**
        const month = req.query.month || new Date().getMonth() + 1;
        const year = req.query.year || new Date().getFullYear();

        date : {
            $gte: new Date(year, month - 1, 1),
            $lt: new Date(year, month, 1)
        }
    */
    Order.find({
        user: ObjectId(req.user._id)
    })
        .populate('item')
        .populate('product')
        .sort({date: -1})
        .then(async (result) => {
            const orders = await Promise.all(result.map(async (order) => {
                order = order.toObject();
                order.unit = await Unit.findOne({
                    _id: ObjectId(order.item.unit)
                });
                return order;
            }));

            res.status(200).send(orders);
        })
        .catch((_err) => {
            res.status(500).send('Internal server error');
        });
});


/**
 * @description This route is used to find out the best price for the given unit by searching through all the products and items available in the zone of the user. Taking into account of how may much orders a distributing entity has placed on that day as well as how much orders a suppying entity has placed on that day. And finally calculating the surcharge and tax for the order.
 */

router.get('/get-best-order', checkRole(Role.USER), async (req, res) => {
    // Get all the products with the given unit
    const {unit, zone} = req.query;

    if (!unit) {
        res.status(400).send('Bad request');
        return;
    }

    const supplyingEntities = await SupplyingEntity.find({ zone: ObjectId(zone) });

    const supplyingEntityIds = supplyingEntities.map((supplyingEntity) => {
        return supplyingEntity._id.valueOf();
    });

    const products = await Product.find({
        unit: ObjectId(unit),
        supplyingEntity: {
            $in: supplyingEntityIds
        }
    });


    // Get all the items with the given unit

    const distributingEntities = await DistributingEntity.find({ zone: ObjectId(zone) });

    const distributingEntityIds = distributingEntities.map((distributingEntity) => {
        return distributingEntity._id.valueOf();
    });

    const items = await Item.find({
        unit: ObjectId(unit),
        distributingEntity: {
            $in: distributingEntityIds
        }
    });

    // Get the best price for the given unit considering all the orders that have been placed on that day

    const bestPrice = {
        product: null,
        item: null,
        surcharge: 0, 
        tax: 0,
        price: 0
    };

    const bestProduct = {
        product: null,
        availability: 0,
        score: 0
    }

    products.forEach(async (product) => {
        if (!bestPrice.product) {
            bestProduct.product = product;
            bestProduct.availability = product.maxOutputPerDay - await Order.find({
                product: ObjectId(product._id),
                date: {
                    $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    $lt: new Date(new Date().setHours(23, 59, 59, 999))
                }
            })
                .countDocuments();
            bestProduct.score = calculateProductScore(product.price, bestProduct.availability);
        } else {
            const availability = product.maxOutputPerDay - await Order.find({
                product: ObjectId(product._id),
                date: {
                    $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    $lt: new Date(new Date().setHours(23, 59, 59, 999))
                }}).countDocuments();
            
            if (calculateProductScore(product.price, availability) > bestProduct.score) {
                bestProduct.product = product;
                bestProduct.availability = availability;
                bestProduct.score = calculateProductScore(product.price, availability);
            }
        }
    });

    bestPrice.product = bestProduct.product;

    const bestItem = {
        item: null,
        availability: 0,
        score: 0
    };

    items.forEach((item) => {
        if (!bestPrice.item) {
            bestItem.item = item;
            bestItem.availability = item.maxCapacityPerDay - Order.find({
                item: ObjectId(item._id),
                date: {
                    $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    $lt: new Date(new Date().setHours(23, 59, 59, 999))
                }
            })
                .countDocuments();
            bestItem.score = calculateItemScore(item.price, bestItem.availability);
        } else {
            const availability = item.maxCapacityPerDay - Order.find({
                item: ObjectId(item._id),
                date: {
                    $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    $lt: new Date(new Date().setHours(23, 59, 59, 999))
                }}).countDocuments();
            
            if (calculateItemScore(item.price, availability) > bestItem.score) {
                bestItem.item = item;
                bestItem.availability = availability;
                bestItem.score = calculateItemScore(item.price, availability);
            }
        }
    });

    bestPrice.item = bestItem.item;

    if (bestPrice.product && bestPrice.item) {
        const bestPriceForUnit = bestPrice.product.price + bestPrice.item.price;
        const unitEntity = await Unit.findOne({
            _id: ObjectId(unit)
        });
        if (unitEntity.type === 'domestic') {
            bestPrice.surcharge = bestPriceForUnit * 0.1;
            bestPrice.tax = bestPriceForUnit * 0.1;
        } else {
            bestPrice.surcharge = bestPriceForUnit * 0.2;
            bestPrice.tax = bestPriceForUnit * 0.2;
        }
        bestPrice.price = bestPriceForUnit + bestPrice.surcharge + bestPrice.tax;

        res.status(200).send(bestPrice);
    } else {
        res.status(404).send('Not found');
    }

});


/**
 * @description This route is used for placing the order with the best price for the given unit. It takes into account of the surcharge and tax for the order.
 */

router.post('/place-order', checkRole(Role.USER), async (req, res) => {
    const { bestPrice } = req.body;

    if (!bestPrice) {
        res.status(400).send('Bad request');
        return;
    }

    const order = new Order({
        user: ObjectId(req.user._id),
        product: ObjectId(bestPrice.product._id),
        item: ObjectId(bestPrice.item._id),
        surcharge: bestPrice.surcharge,
        tax: bestPrice.tax,
        total: bestPrice.price
    });

    order.save()
        .then((order) => {
            res.status(200).send(order);
        })
        .catch((_err) => {
            res.status(500).send('Internal server error');
        });
});


module.exports = router;