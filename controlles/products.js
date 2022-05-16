import Product from "../models/Products.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().limit(req.query.limit).sort({createdAt: "desc"});
        res.status(200).json(products)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
export const getProductsByDate = async (req, res) => {
    try {
        const products = await Product.find( { createdAt: { $gte: req.query.from, $lte: req.query.to } }).limit(req.query.limit).sort({createdAt: "desc"});
        res.status(200).json(products)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
export const addProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        await newProduct.save()
        res.status(200).send("Stworzono produkt")
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
export const delProduct = async (req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.id)
        res.status(200).send("Usunięto produkt")
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
export const editProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send("Edytowano produkt")
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

