import express from 'express';
import { createOrder, getRazorpayOrder, verifyPayment } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder); 
router.post('/razorpay-order', protect, getRazorpayOrder);
router.post('/verify-payment', protect, verifyPayment); 

export default router;
