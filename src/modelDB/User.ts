import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  email: { type: String, unique: true },
  cpf: { type: String, unique: true },
  password: { type: String },
  hasAdress: { type: Boolean }
});

export const userDb = mongoose.model("users", userSchema);
