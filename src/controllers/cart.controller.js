const cartService = require('../services/cart.service');

// Capa HTTP: recibe req/res, delega al service, nunca habla directo con Prisma.

module.exports = {

    // =========================
    // CART
    // =========================
    findAll: async (req, res, next) => {
        try {
            const carts = await cartService.findAll();
            res.json(carts);
        } catch (err) {
            next(err);
        }
    },

    findById: async (req, res, next) => {

        try {

            const cart = await cartService.findById(req.params.id);

            res.json(cart);

        } catch (err) {

            next(err);

        }

    },

    create: async (req, res, next) => {

        try {

            const cart = await cartService.create(req.body);

            res.status(201).json(cart);

        } catch (err) {

            next(err);

        }

    },

    update: async (req, res, next) => {

        try {

            const cart = await cartService.update(
                req.params.id,
                req.body
            );

            res.json(cart);

        } catch (err) {

            next(err);

        }

    },
    // =========================
    // CART ITEMS
    // =========================
    findItems: async (req, res, next) => {

        try {

            const items = await cartService.findItems(
                req.params.id
            );

            res.json(items);

        } catch (err) {

            next(err);

        }

    },
    addItem: async (req, res, next) => {

        try {

            const item = await cartService.addItem(
                req.params.id,
                req.body
            );

            res.status(201).json(item);

        } catch (err) {

            next(err);

        }
    },
    updateItem: async (req, res, next) => {

        try {

            const item = await cartService.updateItem(
                req.params.itemId,
                req.body
            );

            res.json(item);

        } catch (err) {

            next(err);

        }

    },

    deleteItem: async (req, res, next) => {
        try {
            const item = await cartService.deleteItem(
                req.params.itemId
            );

            res.json(item);

        } catch (err) {

            next(err);

        }

    },

};