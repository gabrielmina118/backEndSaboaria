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
const globals_1 = require("@jest/globals");
const src_1 = require("../../src");
const supertest_1 = __importDefault(require("supertest"));
(0, globals_1.describe)("GET em /produts", () => {
    it("Deve retornar uma lista de produtos", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(src_1.app)
            .get("/products")
            .set("Accept", "application/json")
            .expect("content-type", /json/)
            .expect(200);
        (0, globals_1.expect)(response.body[0]).toEqual(globals_1.expect.objectContaining({
            _id: globals_1.expect.any(String),
            categoria_id: globals_1.expect.any(String),
            descricao: globals_1.expect.any(String),
            essencia_id: globals_1.expect.any(String),
            foto: globals_1.expect.any(String),
            ingredientes: globals_1.expect.any(String),
            nome: globals_1.expect.any(String),
            preco: globals_1.expect.any(Number),
            quantidade: globals_1.expect.any(Number),
            tamanho: globals_1.expect.any(String),
        }));
    }));
});
let page;
(0, globals_1.describe)("GET em products?page=2", () => {
    it("Deve retornar uma lista de produtos por pagina", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(src_1.app)
            .get("/products?page=2")
            .set("Accept", "application/json")
            .expect("content-type", /json/)
            .expect(200);
        (0, globals_1.expect)(response.body.length).toEqual(10);
    }));
});
