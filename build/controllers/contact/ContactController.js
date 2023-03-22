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
const Contact_1 = require("../../modelDB/Contact");
class ContactController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, text } = req.body;
                Object.keys(req.body).forEach(function (value) {
                    if (!req.body[value]) {
                        throw new BaseError_1.default(`O valor de '${value}' esta faltando`, 404);
                    }
                });
                const inputDTO = {
                    nome: name,
                    email,
                    texto: text,
                };
                let contactMongoDb = new Contact_1.contactDb(inputDTO);
                contactMongoDb.save((err) => {
                    if (err) {
                        res.status(500).send({ message: err.message });
                    }
                    else {
                        res.status(201).send({
                            message: `Mensagem enviada com sucesso , enviaremos um email em até 24hr para '${email}'`,
                        });
                    }
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
}
exports.default = ContactController;
