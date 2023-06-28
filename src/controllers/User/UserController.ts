import { Request, Response } from "express";
import BaseError from "../../error/BaseError";
import User from "../../model/User";
import { adressDB } from "../../modelDB/Adress";
import { userDb } from "../../modelDB/User";
import Authenticator from "../../libService/Authenticator";
import { HashManager } from "../../libService/HashManager";
import { IoutPutDTO } from "./Interfaces/IoutPutDTO";
import InsertCPF from "../../services/user/insertCpf";
import GetUserById from "../../services/user/getUserById";
import Login from "../../services/user/login";
import { InputDTO } from "./Interfaces/IinputDTO";
import { IInputCreateUserDTO } from "./Interfaces/IInputCreateUserDTO";
import CreateUser from "../../services/user/create";

class UserController {
  public static async insertCpf(req: Request, res: Response) {
    try {
      const id = req.user.id;
      const { cpf } = req.body;

      const updateCpf = await InsertCPF.insertCpf(id, cpf);

      res.status(201).send({
        message: `CPF : ${updateCpf.cpf} , cadastrado com sucesso`,
      });
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }

  public static async getUserById(req: Request, res: Response) {
    try {
      const id = req.user.id;

      const outPutDTO = await GetUserById.getUserById(id);

      res.status(200).send(outPutDTO);
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }

  public static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const inputDTO: InputDTO = {
        email,
        password,
      };

      const outPutDTO = await Login.Login(inputDTO);

      res.status(200).send(outPutDTO);
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }

  public static async createUser(req: Request, res: Response) {
    try {
      const { name, email, cpf, password } = req.body;

      const userInput: IInputCreateUserDTO = {
        name,
        email,
        cpf,
        password,
      };

      const userCreate = await CreateUser.create(userInput);

      res.status(201).send(userCreate);
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }
}
export default UserController;
