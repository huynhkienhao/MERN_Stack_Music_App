import mongoose from "mongoose";

const Foods = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  productImage: { type: String, required: true },
});

export default mongoose.model("Foods", Foods);
