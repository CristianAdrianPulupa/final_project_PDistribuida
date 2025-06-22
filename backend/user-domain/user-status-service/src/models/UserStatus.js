import mongoose from "mongoose";

const userStatusSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  status: { type: String, required: true },
});

export default mongoose.model("UserStatus", userStatusSchema);
