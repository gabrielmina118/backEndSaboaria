"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adressRouter_1 = require("./adressRouter");
const productRouter_1 = require("./productRouter");
const userRouter_1 = require("./userRouter");
const routes = (app) => {
    app.use(productRouter_1.productRouter, userRouter_1.userRouter, adressRouter_1.adressRouter);
};
exports.default = routes;
