import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
connectDB();
dotenv.config();
const app=express();
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart',cartRoutes);

app.listen(process.env.PORT,()=>{console.log(`Connection on port ${process.env.PORT}`);});