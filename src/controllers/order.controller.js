const orderservice = require('../services/order.service');

module.exports = {

    list: async (req, res, next) => {
        try {
            const orders = await orderservice.list();
            res.json(orders);
        } catch (err) {
            next(err);
        }
    },

    getById: async (req, res, next) => {
        try {
            const order = await orderservice.getById(req.params.id);
            res.json(order);
        } catch (err) {
            next(err);
        }
    },

    create: async (req, res, next) => {
        try {
            const order = await orderservice.create(req.body);
            res.status(201).json(order);
        } catch (err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            const order = await orderservice.updateStatus(req.params.id, req.body.status);
            res.json(order);
        } catch (err) {
            next(err);
        }
    },
};