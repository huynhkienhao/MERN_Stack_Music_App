import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  user: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
});

export default mongoose.model("UserCustomer", UserSchema);
