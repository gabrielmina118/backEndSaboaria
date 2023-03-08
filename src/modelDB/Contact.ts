import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  id: { type: String },
  nome: { type: String },
  email: { type: String },
  texto: { type: String },
});

export const contactDb = mongoose.model("contacts", contactSchema);
