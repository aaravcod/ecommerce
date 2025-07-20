import express from 'express';
import { createOrderFromCart , getOrderById} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management and tracking
 */
/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order from user's cart
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: No order items
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/', protect, createOrderFromCart);
/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order details by order ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details returned
 *       403:
 *         description: Not authorized to view this order
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id",protect, getOrderById);


export default router;
