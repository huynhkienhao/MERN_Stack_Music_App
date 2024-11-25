import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  listenedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  favoriteSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  listeningHistory: [
    {
      song: { type: mongoose.Schema.Types.ObjectId, ref: "Song" },
      listenedAt: { type: Date, default: Date.now },
    },
  ],
  role: { type: String, default: "user" },
  genreCounts: {
    type: Map,
    of: Number,
  },
});

export default mongoose.model("AdminUser", UserSchema, "adminuser");
