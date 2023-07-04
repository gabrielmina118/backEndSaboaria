import { Router } from "express";
import CategoriesControllers from "../../controllers/dashBoardController/categories/CategoriesControllers";

export const categoriesRouter = Router();

categoriesRouter.get("/allCateories", CategoriesControllers.allCategories);
categoriesRouter.get("/category/:id", CategoriesControllers.getById);
categoriesRouter.post("/category", CategoriesControllers.create);
categoriesRouter.delete("/category/:id", CategoriesControllers.delete);
categoriesRouter.put("/category/:id", CategoriesControllers.update);
