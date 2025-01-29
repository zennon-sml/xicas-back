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
    res.status(400).json({ error: error.message || "Erro ao criar admin" });
  }
});

// Login admin
router.post("/login/", async (req, res) => {
  const { email, password } = req.body
  try {
    const admin = await Admin.findOne({
      where: { "email": email },
    })
    console.log(email, admin)
    if(admin) {
      res.status(200).json({ error: error.message || "Usúario encontrado"})
    } else {
      res.status(404).json({ error: error.message || "Usúario não encontrado"})
    }
  } catch (error) {
    res.status(500).json({ error: error.message || "Erro ao logar"})
  }
})

export default router
