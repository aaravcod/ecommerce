import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
  items: [
    {
      product: {type: mongoose.Schema.Types.ObjectId,ref: 'Product',required: true},
      quantity: {type: Number,required: true},
      price: {type: Number,required: true
      }
    }
  ],
  totalAmount: {type: Number,required: true},
  shippingAddress: {type: String,required: true},
  paymentStatus: {type: String,enum: ['pending', 'paid', 'failed'],default: 'pending'},
  orderStatus: {
    type: String,enum: ['processing', 'shipped', 'delivered', 'cancelled'],default: 'processing'}
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);
