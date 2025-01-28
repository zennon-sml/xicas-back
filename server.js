const express = require("express");
const { sequelize } = require("./db");
const adminRoutes = require("./routes/admins");
const productRoutes = require("./routes/products");
import dotenv from "dotenv"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/admins", adminRoutes);
app.use("/api/products", productRoutes);

// Sync database and start server
sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully.");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error("Error syncing database:", error.message);
  });
