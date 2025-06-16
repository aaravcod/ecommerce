import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
dotenv.config();
const app=express();
app.use(express.json());

app.use("/api/auth",authRoutes);
connectDB();
app.listen(process.env.PORT,()=>{console.log(`Connection on port ${process.env.PORT}`);});