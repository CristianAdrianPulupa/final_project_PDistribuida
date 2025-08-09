// src/app.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import notesRoutes from "./routes/notesRoutes.js";
import swaggerDef from "./swaggerDef.js";

dotenv.config();
const app = express();

// CORS middleware
console.log("🟡 loading CORS middleware...");
app.use(cors({
  origin: ['http://98.80.152.185'],
  credentials: true
}));

// JSON parser
console.log("🟡 loading JSON middleware...");
app.use(express.json());

// Swagger setup
console.log("🟢 setting up Swagger UI at /api/docs");
const options = {
  swaggerDefinition: swaggerDef,
  apis: ["./src/routes/*.js", "./src/models/*.js"]
};
const swaggerSpec = swaggerJsdoc(options);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount notes routes
console.log("🟢 mounting notes routes on /api/notes...");
app.use("/api/notes", notesRoutes);

// MongoDB connection
console.log("⏳ connecting to MongoDB...");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected (user-notes-service)"))
  .catch(err => console.error("❌ MongoDB connection error:", err.message));

// Health check
app.get("/", (req, res) => {
  res.send("User Notes Service running");
});

// Start server
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => console.log(`🚀 User Notes Service running on port ${PORT}`));
