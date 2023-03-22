"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contactSchema = new mongoose_1.default.Schema({
    id: { type: String },
    nome: { type: String },
    email: { type: String },
    texto: { type: String },
});
exports.contactDb = mongoose_1.default.model("contacts", contactSchema);
