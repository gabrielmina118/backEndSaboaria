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
const IngredientsBussines_1 = __importDefault(require("../../bussines/Ingredients/IngredientsBussines"));
const ProductBussines_1 = __importDefault(require("../../bussines/Produtct/ProductBussines"));
const BaseError_1 = __importDefault(require("../../error/BaseError"));
const Category_1 = require("../../modelDB/Category");
const Essence_1 = require("../../modelDB/Essence");
const Ingredients_1 = require("../../modelDB/Ingredients");
const Products_1 = require("../../modelDB/Products");
class ProductController {
    static createIngredients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome } = req.body;
                const input = {
                    id: 1,
                    nome,
                };
                const createEssence = yield IngredientsBussines_1.default.create(input);
                res
                    .status(201)
                    .send({ message: "Cadastrado com sucesso", createEssence });
            }
            catch (error) {
                if (error instanceof BaseError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(500).send({ message: error.message });
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome } = req.body;
                const input = {
                    nome,
                };
                const createEssence = yield ProductBussines_1.default.create(input);
                res
                    .status(201)
                    .send({ message: "Cadastrado com sucesso", createEssence });
            }
            catch (error) {
                if (error instanceof BaseError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(500).send({ message: error.message });
            }
        });
    }
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allCategories = yield Category_1.categoryDb.find();
                const allProducts = yield Products_1.productDb.find();
                const allcategoriesObject = {
                    semCategoria: {
                        _id: undefined,
                        nome: "produtoSemCategoria",
                        produtos: [],
                    },
                };
                allCategories.map((category) => {
                    allcategoriesObject[category._id.toString()] = {
                        _id: category._id.toString(),
                        nome: category.nome,
                        produtos: [],
                    };
                });
                allProducts.forEach(function (product) {
                    allcategoriesObject[product.categoria_id || "semCategoria"].produtos.push(product);
                });
                res.send(Object.values(allcategoriesObject));
            }
            catch (error) {
                if (error instanceof BaseError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(500).send({ message: error.message });
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page } = req.query;
                let limit = 12;
                if (!page) {
                    limit = 0;
                }
                let skip = limit * (Number(page) - 1);
                const allProducts = yield Products_1.productDb.find().skip(skip).limit(limit);
                res.send(allProducts);
            }
            catch (error) {
                if (error instanceof BaseError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(500).send({ message: error.message });
            }
        });
    }
    static allCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allCategories = yield Category_1.categoryDb.find();
                res.send(allCategories);
            }
            catch (error) {
                if (error instanceof BaseError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(500).send({ message: error.message });
            }
        });
    }
    static allEssences(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allEssences = yield Essence_1.essenceDb.find();
                res.send(allEssences);
            }
            catch (error) {
                if (error instanceof BaseError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(500).send({ message: error.message });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const productId = yield Products_1.productDb.findOne({ _id: id });
                if (!productId) {
                    throw new BaseError_1.default("Produto não encontrado", 404);
                }
                const productRelative = yield Products_1.productDb.find({
                    categoria_id: productId.categoria_id,
                });
                const ingredients = yield Ingredients_1.ingredientDb.find({
                    id: productId.categoria_id,
                });
                const newProductId = Object.assign(Object.assign({}, productId._doc), { ingredients });
                delete newProductId.ingredientes;
                res.status(200).send({ newProductId, productRelative });
            }
            catch (error) {
                if (error instanceof BaseError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(500).send({ message: error.message });
            }
        });
    }
}
exports.default = ProductController;
