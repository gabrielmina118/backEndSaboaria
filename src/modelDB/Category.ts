import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  id: { type: String },
  nome: { type: String },
});

export const categoryDb = mongoose.model("category", categorySchema);
