"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/User/UserController"));
const isAuthenticated_1 = __importDefault(require("../middlewares/isAuthenticated"));
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/user/create", UserController_1.default.createUser);
exports.userRouter.post("/user/login", UserController_1.default.login);
exports.userRouter.get("/user/all", isAuthenticated_1.default, UserController_1.default.allUsers);
