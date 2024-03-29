import { Router } from "express";
import AdressControler from "../../controllers/adress/AdressController";
import isAuthenticated from "../../middlewares/isAuthenticated";

export const adressRouter = Router()

adressRouter.post("/adress",isAuthenticated,AdressControler.create)
adressRouter.get("/adress",isAuthenticated,AdressControler.get)

