import express from "express"
import { createProduct, deleteProduct, getAllProducts, getProductByBarcode, getProductById, updateProductById } from "../controllers/product.js"

const router = express.Router();

// Create a product
router.post("/", createProduct)

// Get all products
router.get("/", getAllProducts)

// Get a product by ID
router.get("/:id", getProductById)

// Get a product by Barcode
router.get("/barcode/:barcode", getProductByBarcode)

// Update a product
router.put("/:id", updateProductById)

// Delete a product
router.delete("/:id", deleteProduct)

export default router