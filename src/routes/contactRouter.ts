import { Router } from "express";
import ContactController from "../controllers/contact/ContactController";

export const contactRouter = Router()

contactRouter.post("/contactSend",ContactController.create)

