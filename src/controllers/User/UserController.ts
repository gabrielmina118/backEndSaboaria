import { Request, Response } from "express";
import BaseError from "../../error/BaseError";
import User from "../../model/User";
import { userDb } from "../../modelDB/User";
import Authenticator from "../../service/Authenticator";
import { HashManager } from "../../service/HashManager";
import { ICreateUser } from "./Interfaces/ICreateUser";

class UserController {
  public static async allUsers(req: Request, res: Response) {
    try {
      const allUsers = await userDb.find();
      res.status(200).send(allUsers);
    } catch (error) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      Object.keys(req.body).forEach(function (value) {
        if (!req.body[value]) {
          throw new BaseError(`The proprety '${value}' is missing`, 404);
        }
      });

      const [emailAlreadExist] = await userDb.find({ email });

      if (!emailAlreadExist) {
        throw new BaseError(`Email ${email} não cadastrado`, 404);
      }

      const verifyPassword = await HashManager.comparePassword(
        password,
        emailAlreadExist.password!
      );

      if (!verifyPassword) {
        throw new BaseError(`senha incorreta`, 401);
      }

      const outPutDTO = {
        id: emailAlreadExist._id,
        name: emailAlreadExist.name,
        email: emailAlreadExist.email,
        cpf: emailAlreadExist.cpf,
        hasAdress: emailAlreadExist.hasAdress,
      };

      const token = Authenticator.generateToken(
        emailAlreadExist._id.toString()
      );

      res.status(200).send({ user: outPutDTO, token });
    } catch (error: any) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
  public static async createUser(req: Request, res: Response) {
    const { name, email, cpf, password } = req.body;

    const userInput: ICreateUser = {
      name,
      email,
      cpf,
      password,
    };

    Object.keys(req.body).forEach(function (value) {
      if (!req.body[value]) {
        throw new BaseError(`The proprety '${value}' is missing`, 404);
      }
    });

    const hashPassword = await HashManager.HashCreate(userInput.password);

    const user = new User(
      userInput.name,
      userInput.email,
      userInput.cpf,
      hashPassword
    );
    
    // cria o modelo do mongo
    let userMongoDB = new userDb(user);

    const outPutDTO = {
      id: userMongoDB._id,
      name: userMongoDB.name,
      email: userMongoDB.email,
      cpf: userMongoDB.cpf,
      hasAdress: userMongoDB.hasAdress,
    };
    const token = Authenticator.generateToken(userMongoDB._id.toString());

    userMongoDB.save((err: any) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(201).send({
          message: "successfully registered user",
          user: outPutDTO,
          token,
        });
      }
    });
  }
}
export default UserController;
