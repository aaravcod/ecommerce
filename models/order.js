import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },
    paymentMethod: { type: String, default: 'Simulated' },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    paymentResult: {
      paymentId: String,
      status: String,
      email: String,
    },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
