import express from 'express';
import { addToCart, getCart } from '../controllers/cartController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/add', requireAuth, addToCart);
router.get('/',requireAuth,getCart);

export default router;
