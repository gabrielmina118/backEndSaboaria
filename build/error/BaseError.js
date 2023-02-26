"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError {
    constructor(message, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.default = BaseError;
