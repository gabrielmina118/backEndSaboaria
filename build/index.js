"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const BaseError_1 = __importDefault(require("./error/BaseError"));
const routes_1 = __importDefault(require("./routes"));
const dbConnect_1 = require("./config/dbConnect");
dbConnect_1.connectionDB.on("Error", console.log.bind(console, "Error na conexão"));
dbConnect_1.connectionDB.once("open", () => {
    console.log("Conexão com o banco realizada com sucesso");
});
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, routes_1.default)(app);
app.use((error, req, res, next) => {
    if (error instanceof BaseError_1.default) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).send({ message: error.message });
});
app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
});
