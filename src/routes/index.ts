import { Express } from "express";
import { adressRouter } from "./adressRouter";
import { contactRouter } from "./contactRouter";
import { productRouter } from "./productRouter";
import { userRouter } from "./userRouter";
import { ingredientsRouter } from "./dashBoardRouters/ingredientsRouter";
import { categoriesRouter } from "./dashBoardRouters/categoriesRouter";
import { essenciesRouter } from "./dashBoardRouters/essenciesRouter";

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
