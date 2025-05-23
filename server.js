import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
dotenv.config();
const app=express();

connectDB();
app.listen(process.env.PORT,()=>{console.log(`Connection on port ${process.env.PORT}`);});