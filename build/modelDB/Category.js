"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    id: { type: String },
    nome: { type: String },
});
exports.categoryDb = mongoose_1.default.model("category", categorySchema);
//# sourceMappingURL=Category.js.map