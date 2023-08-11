"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
mongoose_1.default.set("strictQuery", false);
if (process.env.DB_MONGO_CONFIG) {
    mongoose_1.default.connect(process.env.DB_MONGO_CONFIG);
}
exports.connectionDB = mongoose_1.default.connection;
//# sourceMappingURL=dbConnect.js.map