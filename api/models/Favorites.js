import mongoose from "mongoose";

const FavoritesSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "AdminUser" },
  song_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Song" },
});

export default mongoose.model("Favorites", FavoritesSchema);
