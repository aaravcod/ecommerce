import Order from '../models/order.js';
import Cart from '../models/cart.js';
import { publisher } from '../utils/pubsub.js';

export const createOrderFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.image,
      price: item.product.price,
      quantity: item.quantity
    }));

    const itemsPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const taxPrice = Number((itemsPrice * 0.1).toFixed(2));
    const shippingPrice = itemsPrice > 1000 ? 0 : 50;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod || 'Simulated',
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    const createdOrder = await order.save();
    await publisher.publish('order_created', JSON.stringify({
      orderId: createdOrder._id,
      userEmail: req.user.email 
    }));
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $set: { items: [], totalprice: 0 } }
    );

    res.status(201).json({
      message: 'Order placed successfully',
      order: createdOrder
    });
  } catch (error) {
    console.error('Order creation failed:', error.message);
    res.status(500).json({ message: 'Order creation failed', error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }


    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get order', error });
  }
};


