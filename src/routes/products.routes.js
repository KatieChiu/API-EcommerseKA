const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.controller');
const requireAdmin = require('../middlewares/requireAdmin');

// Público
router.get('/', controller.list);
router.get('/:id', controller.getById);

// Admin (protegidas). En una fase posterior se pueden mover a /api/admin/products
router.post('/', requireAdmin, controller.create);
router.put('/:id', requireAdmin, controller.update);
router.patch('/:id/deactivate', requireAdmin, controller.deactivate);

module.exports = router;
