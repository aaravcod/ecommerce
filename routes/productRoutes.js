import express from 'express';
import {createProduct,getProducts,getProductById,updateProduct,deleteProduct} from '../controllers/productController.js';

import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', getProducts); 
router.get('/:id', getProductById); 

router.post('/', protect, isAdmin, createProduct);       
//router.put('/:id', protect, isAdmin, updateProduct);    
//router.delete('/:id', protect, isAdmin, deleteProduct); 

export default router;
