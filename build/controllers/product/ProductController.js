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
const BaseError_1 = __importDefault(require("../../error/BaseError"));
const getAll_1 = require("../../services/product/getAll");
const getById_1 = require("../../services/product/getById");
const getByName_1 = require("../../services/product/getByName");
class ProductController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page } = req.query;
                const allProducts = yield getAll_1.GetAllService.getAll(page);
                res.status(200).send(allProducts);
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
                const productsById = yield getById_1.GetByIdService.getById(id);
                res.status(200).send(productsById);
            }
            catch (error) {
                if (error instanceof BaseError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(500).send({ message: error.message });
            }
        });
    }
    static getByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome } = req.query;
                const productsName = yield getByName_1.GetByNameService.getByName(nome);
                res.status(200).send(productsName);
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
//# sourceMappingURL=ProductController.js.map