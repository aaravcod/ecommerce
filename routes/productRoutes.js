import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management routes
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get('/:id', getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: Wireless Mouse
 *               price:
 *                 type: number
 *                 example: 29.99
 *               description:
 *                 type: string
 *                 example: Ergonomic wireless mouse with USB receiver
 *     responses:
 *       201:
 *         description: Product created
 *       403:
 *         description: Admin access required
 */
router.post('/', protect, isAdmin, createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Product ID to update
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
 *                 example: Updated Product Name
 *               price:
 *                 type: number
 *                 example: 49.99
 *               description:
 *                 type: string
 *                 example: Updated product description
 *     responses:
 *       200:
 *         description: Product updated
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Product not found
 */
router.put('/:id', protect, isAdmin, updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Product ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Product not found
 */
router.delete('/:id', protect, isAdmin, deleteProduct);

export default router;
