// src/app.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import statusRoutes from "./routes/statusRoutes.js";
import swaggerDef from "./swaggerDef.js";

dotenv.config();
const app = express();

// CORS middleware
console.log("🟡 loading middleware CORS...");
app.use(cors({
  origin: ['http://98.80.152.185'],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// JSON parser
console.log("🟡 loading middleware JSON...");
app.use(express.json());

// Swagger setup
console.log("🟢 setting up Swagger UI at /api/docs");
const options = {
  swaggerDefinition: swaggerDef,
  apis: ["./src/routes/*.js", "./src/models/*.js"]
};
const swaggerSpec = swaggerJsdoc(options);
console.log("🟢 swaggerSpec paths:", options.apis);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount status routes
console.log("🟢 mounting status routes on /api/status...");
app.use("/api/status", statusRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected (user-status-service)"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Health check
app.get("/", (req, res) => {
  res.send("User Status Service running");
});

// Start server
const PORT = process.env.PORT || 3008;
app.listen(PORT, () => console.log(`🚀 Service listening on port ${PORT}`));
