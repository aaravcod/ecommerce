import Order from '../models/order.js';
import { generateSimulatedPayment } from '../utils/simulatePayment.js';

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

export const simulatePayment = async (req, res) => {
  const { id: orderId } = req.params;

  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: 'Order not found' });


  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = generateSimulatedPayment(req.user.email);

  const updatedOrder = await order.save();
  res.json({ message: 'Simulated payment successful', order: updatedOrder });
};
