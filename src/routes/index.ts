import { Express } from "express";
import { adressRouter } from "./adressRouter";
import { productRouter } from "./productRouter";
import { userRouter } from "./userRouter";

const routes = (app: Express) => {
  app.use(productRouter,userRouter, adressRouter);
};
export default routes;
