import { Router } from "express";
import EssenciesControllers from "../../controllers/dashBoardController/essencies/EssenciesControllers";

export const essenciesRouter = Router();

essenciesRouter.get("/allEssences", EssenciesControllers.allEssences);
essenciesRouter.post("/essence", EssenciesControllers.create);
essenciesRouter.put("/essence/:id", EssenciesControllers.update);
essenciesRouter.delete("/essence/:id", EssenciesControllers.delete);
essenciesRouter.get("/essence/:id", EssenciesControllers.getById);
