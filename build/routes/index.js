"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adressRouter_1 = require("./browserRouters/adressRouter");
const ingredientsRouter_1 = require("./dashBoardRouters/ingredientsRouter");
const categoriesRouter_1 = require("./dashBoardRouters/categoriesRouter");
const essenciesRouter_1 = require("./dashBoardRouters/essenciesRouter");
const productRouter_1 = require("./browserRouters/productRouter");
const userRouter_1 = require("./browserRouters/userRouter");
const contactRouter_1 = require("./browserRouters/contactRouter");
const routes = (app) => {
    app.use(productRouter_1.productRouter, userRouter_1.userRouter, adressRouter_1.adressRouter, contactRouter_1.contactRouter, ingredientsRouter_1.ingredientsRouter, categoriesRouter_1.categoriesRouter, essenciesRouter_1.essenciesRouter);
};
exports.default = routes;
//# sourceMappingURL=index.js.map