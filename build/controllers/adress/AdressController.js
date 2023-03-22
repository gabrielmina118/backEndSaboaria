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
const Adress_1 = __importDefault(require("../../model/Adress"));
const Adress_2 = require("../../modelDB/Adress");
const User_1 = require("../../modelDB/User");
class AdressControler {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { street, complement, neighbourhood, number, city, state } = req.body;
                const id = req.user.id;
                Object.keys(req.body).forEach(function (value) {
                    if (!req.body[value]) {
                        throw new BaseError_1.default(`O valor '${value}' esta faltando`, 404);
                    }
                });
                const inputDTO = {
                    id_user: id,
                    street,
                    complement,
                    neighbourhood,
                    number,
                    city,
                    state,
                };
                const adress = new Adress_1.default(id, inputDTO.street, inputDTO.complement, inputDTO.neighbourhood, inputDTO.number, inputDTO.city, inputDTO.state);
                let adressMongoDB = new Adress_2.adressDB(adress);
                yield User_1.userDb.findByIdAndUpdate(id, {
                    hasAdress: true,
                });
                adressMongoDB.save((err) => {
                    if (err) {
                        res.status(500).send({ message: err.message });
                    }
                    else {
                        res.status(201).send({
                            message: "Endereço cadastrado com sucesso!",
                        });
                    }
                });
            }
            catch (error) {
                if (error instanceof BaseError_1.default) {
                    res.status(error.statusCode).send({ message: error.message });
                }
            }
        });
    }
}
exports.default = AdressControler;
