import { Router } from "express";
import EssenciesControllers from "../../controllers/dashBoardController/essencies/EssenciesControllers";

export const essenciesRouter = Router();

essenciesRouter.get("/allEssences", EssenciesControllers.allEssences);
essenciesRouter.post("/essencia", EssenciesControllers.create);
