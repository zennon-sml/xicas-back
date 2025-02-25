import express from "express"
import dotenv from "dotenv"
import sequelize from "./db.js"
import adminRoutes from "./routes/admins.js"
import productRoutes from "./routes/products.js"
import salesRoutes from "./routes/sales.js"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser())
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin || "*"); // Allow any origin dynamically
    },
    credentials: true, // Allow credentials (cookies, authorization headers)
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these methods
  })
)

// Routes
app.use("/api/admins", adminRoutes)
app.use("/api/products", productRoutes)
app.use("/api/sales", salesRoutes);

// Sync database and start server
sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully.")
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error("Error syncing database:", error.message)
  })
