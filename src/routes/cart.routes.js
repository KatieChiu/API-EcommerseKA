const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.controller');

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Listar todos los carritos
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Lista de carritos
 */
router.get('/', controller.findAll);

/**
 * @swagger
 * /api/cart/{id}:
 *   get:
 *     summary: Obtener un carrito por ID
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrito encontrado
 */
router.get('/:id', controller.findById);

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Crear un carrito nuevo
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [sessionId]
 *             properties:
 *               sessionId:
 *                 type: string
 *                 example: guest-session-abc123
 *               customerId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Carrito creado
 */
router.post('/', controller.create);

/**
 * @swagger
 * /api/cart/{id}:
 *   put:
 *     summary: Actualizar un carrito (ej. asociar cliente)
 *     tags: [Cart]
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
 *             properties:
 *               customerId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Carrito actualizado
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /api/cart/{id}/items:
 *   get:
 *     summary: Listar productos de un carrito
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Items del carrito
 */
router.get('/:id/items', controller.findItems);

/**
 * @swagger
 * /api/cart/{id}/items:
 *   post:
 *     summary: Agregar un producto al carrito
 *     tags: [Cart]
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
 *             required: [productId, quantity]
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Producto agregado
 */
router.post('/:id/items', controller.addItem);

/**
 * @swagger
 * /api/cart/items/{itemId}:
 *   put:
 *     summary: Actualizar cantidad de un producto en el carrito
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quantity]
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Item actualizado
 */
router.put('/items/:itemId', controller.updateItem);

/**
 * @swagger
 * /api/cart/items/{itemId}:
 *   delete:
 *     summary: Eliminar un producto del carrito
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item eliminado
 */
router.delete('/items/:itemId', controller.deleteItem);

module.exports = router;