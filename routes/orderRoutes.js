import express from 'express';
import { createOrder, simulatePayment } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.put('/:id/pay', protect, simulatePayment);

export default router;
