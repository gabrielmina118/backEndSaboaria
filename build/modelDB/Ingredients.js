"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingredientDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ingredientsSchema = new mongoose_1.default.Schema({
    id: { type: String },
    nome: { type: String },
});
exports.ingredientDb = mongoose_1.default.model("ingredients", ingredientsSchema);
