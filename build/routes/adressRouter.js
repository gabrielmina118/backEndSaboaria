"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adressRouter = void 0;
const express_1 = require("express");
const AdressController_1 = __importDefault(require("../controllers/adress/AdressController"));
const isAuthenticated_1 = __importDefault(require("../middlewares/isAuthenticated"));
exports.adressRouter = (0, express_1.Router)();
exports.adressRouter.post("/adress/create", isAuthenticated_1.default, AdressController_1.default.create);
exports.adressRouter.get("/adress/user", isAuthenticated_1.default, AdressController_1.default.getUser);
