import { Router } from "express";
import ProductController from "../controllers/product/ProductController";

export const productRouter = Router()

productRouter.get("/productsCategory",ProductController.get)
productRouter.get("/products",ProductController.getAll)
productRouter.get("/allCateories",ProductController.allCategories)
productRouter.get("/allEssences",ProductController.allEssences)
productRouter.get("/product/:id",ProductController.getById)
productRouter.post("/cria-essencia",ProductController.create)