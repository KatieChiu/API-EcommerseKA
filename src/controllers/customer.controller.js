const customerService = require('../services/customer.service');

module.exports = {
    list: async (req, res, next) => {
        try {
            const customers = await customerService.list();
            res.json(customers);
        } catch (err) {
            next(err);
        }
    },

    getById: async (req, res, next) => {
        try {
            const customer = await customerService.getById(req.params.id);
            res.json(customer);
        } catch (err) {
            next(err);
        }
    },

    create: async (req, res, next) => {
        try {
            const customer = await customerService.create(req.body);
            res.status(201).json(customer);
        } catch (err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            const customer = await customerService.update(req.params.id, req.body);
            res.json(customer);
        } catch (err) {
            next(err);
        }
    },

    delete: async (req, res, next) => {
        try {
            await customerService.delete(req.params.id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    },
};