import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: String },
  nome: { type: String },
  foto: { type: String },
  preco: { type: Number },
  quantidade: { type: Number },
  ingredientes: { type: String },
  descricao: { type: String },
  tamanho: { type: String },
  categoria_id: { type: mongoose.Schema.Types.ObjectId, ref:"categories" , required: true },
});

export const productDb = mongoose.model("products", productSchema);
