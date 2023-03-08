import { Express } from "express";
import { adressRouter } from "./adressRouter";
import { contactRouter } from "./contactRouter";
import { productRouter } from "./productRouter";
import { userRouter } from "./userRouter";

const routes = (app: Express) => {
  app.use(productRouter,userRouter, adressRouter,contactRouter);
};
export default routes;
