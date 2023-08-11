"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    id: { type: String },
    nome: { type: String },
    foto: { type: String },
    preco: { type: Number },
    quantidade: { type: Number },
    ingredientes: { type: String },
    descricao: { type: String },
    tamanho: { type: String },
    categoria_id: { type: String },
});
exports.productDb = mongoose_1.default.model("products", productSchema);
//# sourceMappingURL=Products.js.map