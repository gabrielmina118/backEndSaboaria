"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.essenceDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const essenceSchema = new mongoose_1.default.Schema({
    id: { type: String },
    nome: { type: String },
});
exports.essenceDb = mongoose_1.default.model("essences", essenceSchema);
//# sourceMappingURL=Essence.js.map