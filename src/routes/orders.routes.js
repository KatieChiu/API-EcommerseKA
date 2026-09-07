const express = require('express');
const router = express.Router();
const controller = require('../controllers/order.controller');

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear un pedido (checkout)
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [customerId, contactName, primaryPhone, deliveryAddress, items]
 *             properties:
 *               customerId:
 *                 type: string
 *               contactName:
 *                 type: string
 *                 example: Juan Pérez
 *               primaryPhone:
 *                 type: string
 *                 example: "9999-9999"
 *               secondaryPhone:
 *                 type: string
 *               deliveryAddress:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [productId, quantity]
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Pedido creado
 */
router.post('/', controller.create);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Consultar el estado de un pedido
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido encontrado
 */
router.get('/:id', controller.getById);

module.exports = router;