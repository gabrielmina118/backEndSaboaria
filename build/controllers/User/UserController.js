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
const insertCpf_1 = __importDefault(require("../../services/user/insertCpf"));
const getUserById_1 = __importDefault(require("../../services/user/getUserById"));
const login_1 = __importDefault(require("../../services/user/login"));
const create_1 = __importDefault(require("../../services/user/create"));
class UserController {
    static insertCpf(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.user.id;
                const { cpf } = req.body;
                const updateCpf = yield insertCpf_1.default.insertCpf(id, cpf);
                res.status(201).send({
                    message: `CPF : ${updateCpf.cpf} , cadastrado com sucesso`,
                });
            }
            catch (error) {
                if (error instanceof BaseError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(500).send({ message: error.message });
            }
        });
    }
    static getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.user.id;
                const outPutDTO = yield getUserById_1.default.getUserById(id);
                res.status(200).send(outPutDTO);
            }
            catch (error) {
                if (error instanceof BaseError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(500).send({ message: error.message });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const inputDTO = {
                    email,
                    password,
                };
                const outPutDTO = yield login_1.default.Login(inputDTO);
                res.status(200).send(outPutDTO);
            }
            catch (error) {
                if (error instanceof BaseError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(500).send({ message: error.message });
            }
        });
    }
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, cpf, password } = req.body;
                const userInput = {
                    name,
                    email,
                    cpf,
                    password,
                };
                const userCreate = yield create_1.default.create(userInput);
                res.status(201).send(userCreate);
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
exports.default = UserController;
//# sourceMappingURL=UserController.js.map