"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const ProductController_1 = __importDefault(require("../controllers/product/ProductController"));
exports.productRouter = (0, express_1.Router)();
exports.productRouter.get("/productsCategory", ProductController_1.default.get);
exports.productRouter.get("/products", ProductController_1.default.getAll);
exports.productRouter.get("/allCateories", ProductController_1.default.allCategories);
exports.productRouter.get("/allEssences", ProductController_1.default.allEssences);
exports.productRouter.get("/product/:id", ProductController_1.default.getById);
exports.productRouter.post("/cria-essencia", ProductController_1.default.create);
exports.productRouter.post("/cria-ingredientes", ProductController_1.default.createIngredients);
