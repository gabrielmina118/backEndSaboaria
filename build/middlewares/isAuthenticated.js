"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Authenticator_1 = __importDefault(require("../libService/Authenticator"));
function isAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(404).json({ message: "JWT TOKEN is missing" });
    }
    try {
        const decode = Authenticator_1.default.getToken(authHeader);
        req.user = {
            id: decode.id,
        };
        return next();
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
}
exports.default = isAuthenticated;
//# sourceMappingURL=isAuthenticated.js.map