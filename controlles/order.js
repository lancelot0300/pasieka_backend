import mongoose from "mongoose";
import Order from "../models/Order.js";
import { verifyToken } from "../utils/verifyTest.js";


export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: "desc" }).limit(req.query.limit || 10);
        res.status(200).json(orders)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
export const getOrdersByDate = async (req, res) => {
    try {
        const orders = await Order.find({ createdAt: { $gte: req.query.from, $lte: req.query.to } }).sort({ createdAt: "desc" }).limit(req.query.limit || 10);
        res.status(200).json(orders)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
export const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json(order)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
export const addOrder = async (req, res) => {
    let user;
    try {
        await verifyToken(req, res, () => {
            user = req.user
        })
        if (!req.body.cart || req.body.cart.length === 0) return res.status(500).send("brak koszyka")
        const newOrder = new Order({
            userId: user.id,
            cart: req.body.cart
        })
        await newOrder.save()
        res.status(200).send("Stworzono zamówienie")
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
export const delOrder = async (req, res) => {
    try {
        await Order.findByIdAndRemove(req.params.id)
        res.status(200).send("Usunięto produkt")
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
export const editOrder = async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send("Edytowano produkt")
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

