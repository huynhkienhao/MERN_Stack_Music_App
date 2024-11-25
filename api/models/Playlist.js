import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "AdminUser", required: true },
  name: { type: String, required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Playlist", PlaylistSchema);
