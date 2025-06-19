import Cart from '../models/cart.js';
import Product from '../models/products.js';
import mongoose from 'mongoose';

export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
        totalprice: product.price * quantity,
        updatedAt: new Date()
      });
    } else {
      const itemIndex = cart.items.findIndex(item =>
        item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      cart.totalprice = 0;
      for (const item of cart.items) {
        const prod = await Product.findById(item.product);
        if (prod) {
          cart.totalprice += prod.price * item.quantity;
        }
      }

      cart.updatedAt = new Date();
    }

    await cart.save();

    return res.status(200).json({
      message: 'Product added to cart',
      cart
    });

  } catch (error) {
    console.error('Add to cart error:', error.message);
    return res.status(500).json({ message: 'Failed to add to cart', error: error.message });
  }
};


export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    return res.status(200).json({
      message: "Cart fetched successfully",
      cart: {
        items: cart.items,
        totalprice: cart.totalprice,
        updatedAt: cart.updatedAt
      }
    });

  } catch (error) {
    console.error("Get Cart Error:", error.message);
    return res.status(500).json({ message: "Failed to fetch cart", error: error.message });
  }
};
