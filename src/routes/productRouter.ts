import { Router } from "express";
import ProductController from "../controllers/product/ProductController";

export const productRouter = Router()

productRouter.get("/products",ProductController.get)
productRouter.get("/product/:id",ProductController.getById)