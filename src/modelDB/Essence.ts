import mongoose from "mongoose";

const essenceSchema = new mongoose.Schema({
  id: { type: String },
  nome: { type: String },
});

export const essenceDb = mongoose.model("essences", essenceSchema);
