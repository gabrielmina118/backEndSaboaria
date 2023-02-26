import mongoose from "mongoose";
import { config } from "dotenv";

config();

mongoose.set("strictQuery", false);
if (process.env.DB_MONGO_CONFIG!) {
  mongoose.connect(process.env.DB_MONGO_CONFIG!);
}

export let connectionDB = mongoose.connection;
