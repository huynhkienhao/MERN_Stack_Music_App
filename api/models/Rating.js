import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "AdminUser", required: true },
  song: { type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true },
  score: { type: Number, min: 1, max: 5, required: true },
  createdAt: { type: Date, default: Date.now },
  history: [
    {
      score: Number,
      updatedAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("Rating", RatingSchema);
