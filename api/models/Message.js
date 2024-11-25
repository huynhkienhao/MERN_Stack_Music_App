import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "AdminUser", required: true },
  song: { type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Message", MessageSchema);