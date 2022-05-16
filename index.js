import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import authRoute from './routes/auth.js'
import productsRoute from './routes/products.js'
import orderRoutes from './routes/orders.js'
import cookieParser from "cookie-parser";
import cors from 'cors';
const app = express()
dotenv.config()

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO)
        console.log('Connected to DB')
    }
    catch(error)
    {
        throw error
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from DB')
})
app.use(cookieParser())
app.use(express.json())

app.use(cors({origin: 'http://localhost:3000'}));

app.use("/api/auth", authRoute)
app.use("/api/products", productsRoute)
app.use("/api/orders", orderRoutes)

app.listen(3001, () => {
    connect();
    console.log("Connected to backend")
})