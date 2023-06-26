import { Express } from "express";
import { adressRouter } from "./browserRouters/adressRouter";
import { ingredientsRouter } from "./dashBoardRouters/ingredientsRouter";
import { categoriesRouter } from "./dashBoardRouters/categoriesRouter";
import { essenciesRouter } from "./dashBoardRouters/essenciesRouter";
import { productRouter } from "./browserRouters/productRouter";
import { userRouter } from "./browserRouters/userRouter";
import { contactRouter } from "./browserRouters/contactRouter";

const routes = (app: Express) => {
  app.use(
    productRouter,
    userRouter,
    adressRouter,
    contactRouter,
    ingredientsRouter,
    categoriesRouter,
    essenciesRouter
  );
};
export default routes;
