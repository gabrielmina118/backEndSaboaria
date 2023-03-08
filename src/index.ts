import express, { Express } from "express";
import cors from "cors";
import routes from "./routes";
import { connectionDB } from "./config/dbConnect";

// Abrir conexão com o banco
connectionDB.on("Error", console.log.bind(console, "Error na conexão"));
connectionDB.once("open", () => {
  console.log("Conexão com o banco realizada com sucesso");
});

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

routes(app);

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
