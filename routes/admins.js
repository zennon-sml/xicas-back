import express from "express"
import { createAdmin, loginAdminWithEmail } from "../controllers/admin.js"

const router = express.Router();

// Create an admin
router.post("/", createAdmin);

// Login admin
router.post("/login/", loginAdminWithEmail)

export default router
