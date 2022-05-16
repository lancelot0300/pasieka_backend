import express from "express";
import { addProduct, delProduct, editProduct, getAllProducts, getProduct, getProductsByDate } from "../controlles/products.js";
import { verifyAdmin } from "../utils/verifyTest.js";

const router = express.Router();

router.get("/", getAllProducts)
router.get("/product/:id", getProduct)
router.get("/date", getProductsByDate)
router.post("/add",verifyAdmin, addProduct)
router.delete("/del/:id",verifyAdmin, delProduct)
router.put("/edit/:id",verifyAdmin, editProduct)

export default router