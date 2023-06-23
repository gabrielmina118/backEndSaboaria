import { Router } from "express";
import IngredientesControllers from "../../controllers/dashBoardController/ingredients/IngredientsControllers";

export const ingredientsRouter = Router();

ingredientsRouter.post("/ingredients", IngredientesControllers.create);
