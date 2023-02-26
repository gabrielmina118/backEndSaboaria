"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = __importDefault(require("../error/BaseError"));
const Authenticator_1 = __importDefault(require("../service/Authenticator"));
function isAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new BaseError_1.default("JWT TOKEN is missing", 404);
    }
    try {
        const decode = Authenticator_1.default.getToken(authHeader);
        req.user = {
            id: decode.id,
        };
        return next();
    }
    catch (error) {
        throw new BaseError_1.default("Invalid JWT Token");
    }
}
exports.default = isAuthenticated;
