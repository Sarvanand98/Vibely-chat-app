import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from 'cookie-parser';
import authroutes from '../src/routes/auth.route.js'
import { connectDB } from './lib/db.js';
import userRoutes from './routes/user.route.js'
import chatRoutes from './routes/chat.route.js'
import paymentRoutes from './routes/payment.route.js'
import aiRoutes from './routes/ai.route.js'
import cors from 'cors'
import path from 'path'

const app =express()
const PORT = process.env.PORT || 5001

const __dirname = path.resolve();
const allowedOrigins = [
  "http://localhost:5173",
  "https://vibely-uk0o.onrender.com" 
];
app.use(cors({
    origin:allowedOrigins,
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authroutes)
app.use("/api/users",userRoutes)
app.use("/api/chat",chatRoutes)
app.use("/api/payment",paymentRoutes)
app.use("/api/ai",aiRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

app.listen(PORT,()=>{
    console.log(`server runing at ${PORT}`);
    connectDB();
})