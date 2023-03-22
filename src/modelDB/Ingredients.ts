import mongoose from "mongoose";

const ingredientsSchema = new mongoose.Schema({
  id: { type: String },
  nome: { type: String },
});

export const ingredientDb = mongoose.model("ingredients", ingredientsSchema);
