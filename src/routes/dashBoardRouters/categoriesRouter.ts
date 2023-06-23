import { Router } from "express";
import CategoriesControllers from "../../controllers/dashBoardController/categories/CategoriesControllers";

export const categoriesRouter = Router();

categoriesRouter.get("/allCateories", CategoriesControllers.allCategories);
