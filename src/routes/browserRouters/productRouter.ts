import { Router } from "express";
import ProductController from "../../controllers/product/ProductController";

export const productRouter = Router();

productRouter.get("/products", ProductController.getAll);
productRouter.get("/product/:id", ProductController.getById);
productRouter.get("/produtosNome", ProductController.getByName);
