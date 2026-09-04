const productsService = require('../services/products.service');

// Capa HTTP: recibe req/res, delega al service, nunca habla directo con Prisma.
module.exports = {
  list: async (req, res, next) => {
    try {
      const products = await productsService.listActive();
      res.json(products);
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const product = await productsService.getById(req.params.id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const product = await productsService.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const product = await productsService.update(req.params.id, req.body);
      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  deactivate: async (req, res, next) => {
    try {
      const product = await productsService.deactivate(req.params.id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  },
};
