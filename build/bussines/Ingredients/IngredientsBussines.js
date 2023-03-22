"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductData_1 = __importDefault(require("../../data/ProductData"));
const Ingredients_1 = require("../../modelDB/Ingredients");
class IngredientsBussines {
    static create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input.nome) {
                throw new Error("Essencia não informada");
            }
            let ingredient = new Ingredients_1.ingredientDb(input);
            const response = yield ProductData_1.default.createIngredient(ingredient);
            return response;
        });
    }
}
exports.default = IngredientsBussines;
