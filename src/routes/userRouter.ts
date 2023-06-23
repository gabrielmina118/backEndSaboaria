import { Router } from "express";
import UserController from "../controllers/User/UserController";
import isAuthenticated from "../middlewares/isAuthenticated";

export const userRouter = Router()

userRouter.post("/user/create" , UserController.createUser)
userRouter.post("/user/login" , UserController.login)
userRouter.post("/user/cpf",isAuthenticated,UserController.insertCpf)
userRouter.get("/user",isAuthenticated,UserController.getUserById)