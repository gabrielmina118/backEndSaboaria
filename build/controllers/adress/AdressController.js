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
const create_1 = __importDefault(require("../../services/Adress/create"));
const getAdress_1 = __importDefault(require("../../services/Adress/getAdress"));
class AdressControler {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { street, complement, neighbourhood, number, city, state } = req.body;
                const id = req.user.id;
                const inputDTO = {
                    id_user: id,
                    street,
                    complement,
                    neighbourhood,
                    number,
                    city,
                    state,
                };
                const createAdress = yield create_1.default.create(inputDTO, id);
                res.status(201).send(createAdress);
            }
            catch (error) {
                if (error instanceof BaseError_1.default) {
                    res.status(error.statusCode).send({ message: error.message });
                }
            }
        });
    }
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.user.id;
                const adress = yield getAdress_1.default.get(id);
                res.status(200).send(adress);
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
//# sourceMappingURL=AdressController.js.map