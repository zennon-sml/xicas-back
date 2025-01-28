import express from "express"
import Admin from "../models/admin.js";

const router = express.Router();

// Create an admin
router.post("/", async (req, res) => {
  const { name, email, password_hash } = req.body;
  try {
    const admin = await Admin.create({ name, email, password_hash });
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message || "An error occurred" });
  }
});

export default router
