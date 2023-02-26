"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    id: { type: String },
    name: { type: String },
    email: { type: String, unique: true },
    cpf: { type: String, unique: true },
    password: { type: String },
    hasAdress: { type: Boolean }
});
exports.userDb = mongoose_1.default.model("users", userSchema);
