const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer.controller');
const requireAdmin = require('../middlewares/requireAdmin');

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Listar todos los clientes (admin)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
router.get('/', requireAdmin, controller.list);

/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: Obtener un cliente por ID (admin)
 *     tags: [Customers]
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
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente no encontrado
 */
router.get('/:id', requireAdmin, controller.getById);

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Crear un cliente (usado en checkout, no requiere login)
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, primaryPhone, address]
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Juan Pérez
 *               primaryPhone:
 *                 type: string
 *                 example: "9999-9999"
 *               secondaryPhone:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente creado
 *       400:
 *         description: Faltan campos requeridos
 */
router.post('/', controller.create);

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Actualizar un cliente (admin)
 *     tags: [Customers]
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
 *               fullName:
 *                 type: string
 *               primaryPhone:
 *                 type: string
 *               secondaryPhone:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente actualizado
 *       404:
 *         description: Cliente no encontrado
 */
router.put('/:id', requireAdmin, controller.update);

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Eliminar un cliente (admin)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Cliente eliminado
 *       404:
 *         description: Cliente no encontrado
 */
router.delete('/:id', requireAdmin, controller.delete);

module.exports = router;