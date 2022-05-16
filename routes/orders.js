import express from "express";
import { addOrder, delOrder, editOrder, getAllOrders, getOrder, getOrdersByDate } from "../controlles/order.js";
import { verifyAdmin } from "../utils/verifyTest.js";

const router = express.Router();


router.get("/",verifyAdmin, getAllOrders)
router.get("/order/:id", getOrder)
router.get("/date",verifyAdmin, getOrdersByDate)
router.post("/add", addOrder)
router.delete("/del/:id",verifyAdmin, delOrder)
router.put("/edit/:id",verifyAdmin, editOrder)

export default router