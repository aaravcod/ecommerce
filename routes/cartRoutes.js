import express from 'express';
import { addToCart, getCart ,updateCartItem} from '../controllers/cartController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/add', requireAuth, addToCart);
router.get('/',requireAuth,getCart);
router.put('/update',requireAuth,updateCartItem)

export default router;
