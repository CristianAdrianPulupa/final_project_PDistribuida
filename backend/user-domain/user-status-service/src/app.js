import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import statusRoutes from "./routes/statusRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/status", statusRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => res.send("User Status Service running"));

const PORT = process.env.PORT || 3008;
app.listen(PORT, () => console.log(`🚀 Service on port ${PORT}`));
