import Order from '../models/orderModel.js';

export const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

import { razorpay } from '../utils/razorpay.js';

export const getRazorpayOrder = async (req, res) => {
  const { totalPrice } = req.body;

  const options = {
    amount: totalPrice * 100, 
    currency: 'INR',
    receipt: 'receipt_order_' + Date.now(),
  };

  const order = await razorpay.orders.create(options);
  res.json(order);
};

import crypto from 'crypto';
import Order from '../models/orderModel.js';

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  const sign = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ message: 'Payment verification failed' });
  }

  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  };

  const updatedOrder = await order.save();
  res.json({ message: 'Payment verified and order paid', order: updatedOrder });
};
