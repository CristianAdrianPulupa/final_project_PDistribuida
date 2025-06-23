import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// 👇 Aquí montamos la ruta base
app.use("/api/notes", notesRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Mongo conectado"))
  .catch((err) => console.error("❌ Error Mongo:", err));

app.get("/", (req, res) => res.send("📝 User Notes Service running"));

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => console.log(`🚀 User Notes Service running on port ${PORT}`));
