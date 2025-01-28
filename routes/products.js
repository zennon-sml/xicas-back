import express from "express"
import Product from "../models/product";

const router = express.Router();

// Create a product
router.post("/", async (req, res) => {
  const { name, barcode, description, price, cost, image } = req.body;
  try {
    const product = await Product.create({ name, barcode, description, price, cost, image });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message || "An error occurred" });
  }
});

// Get all products
router.get("/", async (_req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message || "An error occurred" });
  }
});

// Get a product by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message || "An error occurred" });
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, barcode, description, price, cost, image } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      await product.update({ name, barcode, description, price, cost, image });
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message || "An error occurred" });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      await product.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message || "An error occurred" });
  }
});

export default router