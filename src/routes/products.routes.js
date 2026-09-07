const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.controller');
const requireAdmin = require('../middlewares/requireAdmin');

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Listar productos activos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/', controller.list);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un producto (admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, categoryId, price]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Audífonos Bluetooth
 *               categoryId:
 *                 type: string
 *               price:
 *                 type: number
 *                 example: 650.00
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post('/', requireAdmin, controller.create);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto (admin)
 *     tags: [Products]
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
 *             properties:
 *               name:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Producto actualizado
 */
router.put('/:id', requireAdmin, controller.update);

/**
 * @swagger
 * /api/products/{id}/deactivate:
 *   patch:
 *     summary: Desactivar un producto (admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto desactivado
 */
router.patch('/:id/deactivate', requireAdmin, controller.deactivate);

module.exports = router;