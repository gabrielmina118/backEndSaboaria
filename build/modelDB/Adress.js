"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adressDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const adressSchema = new mongoose_1.default.Schema({
    id_user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "users", required: true },
    street: { type: String },
    complement: { type: String },
    neighbourhood: { type: String },
    number: { type: Number },
    city: { type: String },
    state: { type: String },
});
exports.adressDB = mongoose_1.default.model("adress", adressSchema);
//# sourceMappingURL=Adress.js.map