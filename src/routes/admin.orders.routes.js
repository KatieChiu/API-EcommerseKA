const express = require('express');
const router = express.Router();
const controller = require('../controllers/order.controller');
const requireAdmin = require('../middlewares/requireAdmin');

/**
 * @swagger
 * /api/admin/orders:
 *   get:
 *     summary: Listar todos los pedidos (admin)
 *     tags: [Admin - Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get('/', requireAdmin, controller.list);

/**
 * @swagger
 * /api/admin/orders/{id}/status:
 *   patch:
 *     summary: Cambiar el estado de un pedido (admin)
 *     tags: [Admin - Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Completed, Rejected, PaymentFailed]
 *     responses:
 *       200:
 *         description: Pedido actualizado
 */
router.patch('/:id/status', requireAdmin, controller.update);

module.exports = router;