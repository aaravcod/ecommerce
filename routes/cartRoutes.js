import express from 'express';
import {
  addToCart,
  getCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from '../controllers/cartController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart operations (requires authentication)
 */

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64a765e9b2e94a13d4e5f331
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Item added to cart
 */
router.post('/add', requireAuth, addToCart);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get the current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's cart returned successfully
 */
router.get('/', requireAuth, getCart);

/**
 * @swagger
 * /api/cart/update:
 *   put:
 *     summary: Update an item in the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64a765e9b2e94a13d4e5f331
 *               quantity:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Cart item updated
 */
router.put('/update', requireAuth, updateCartItem);

/**
 * @swagger
 * /api/cart/delete/{id}:
 *   delete:
 *     summary: Delete a specific item from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the cart item to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart item deleted
 */
router.delete('/delete/:id', requireAuth, deleteCartItem);

/**
 * @swagger
 * /api/cart/clear:
 *   delete:
 *     summary: Clear all items from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared
 */
router.delete('/clear', requireAuth, clearCart);

export default router;
