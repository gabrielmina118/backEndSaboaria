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
const ProductBussines_1 = __importDefault(require("../src/bussines/Produtct/ProductBussines"));
const BaseError_1 = __importDefault(require("../src/error/BaseError"));
const ProductData_1 = __importDefault(require("../src/data/ProductData"));
const src_1 = require("../src");
const input = { nome: "Essencia teste" };
let server;
beforeEach(() => {
    const port = 3000;
    server = src_1.app.listen(port);
});
afterEach(() => {
    server.close();
});
describe("Teste de criação da essencia", () => {
    it("create function should throw an error if input.nome is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            if (error instanceof BaseError_1.default) {
                expect(ProductBussines_1.default.create(input)).rejects.toThrow(BaseError_1.default);
            }
        }
    }));
    test("create function should return the response from ProductData.createEssence", () => __awaiter(void 0, void 0, void 0, function* () {
        const createEssenceMock = jest
            .fn()
            .mockReturnValue({ message: "Cadastrado com sucesso" });
        jest
            .spyOn(ProductData_1.default, "createEssence")
            .mockImplementation(createEssenceMock);
        const response = yield ProductBussines_1.default.create(input);
        expect(response).toEqual({ message: "Cadastrado com sucesso" });
    }));
    test("create function should call ProductData.createEssence with the correct parameter", () => __awaiter(void 0, void 0, void 0, function* () {
        const input = { nome: "Teste", descricao: "Teste" };
        const essenceDbMock = jest
            .fn()
            .mockReturnValue({ nome: "Teste", descricao: "Teste" });
        expect(essenceDbMock).toHaveBeenCalledWith(input);
    }));
});
