import mongoose from "mongoose";


const adressSchema = new mongoose.Schema({
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  street: { type: String },
  complement: { type: String },
  neighbourhood: { type: String },
  number: { type: Number },
  city: { type: String },
  state: { type: String },
});

export const adressDB = mongoose.model("adress", adressSchema);
