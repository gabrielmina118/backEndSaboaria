import { Request, Response } from "express";
import BaseError from "../../error/BaseError";
import User from "../../model/User";
import { adressDB } from "../../modelDB/Adress";
import { userDb } from "../../modelDB/User";
import Authenticator from "../../libService/Authenticator";
import { HashManager } from "../../libService/HashManager";
import { ICreateUser } from "./Interfaces/ICreateUser";
import { IoutPutDTO } from "./Interfaces/IoutPutDTO";

class UserController {
  public static async insertCpf(req: Request, res: Response) {
    try {
      const id = req.user.id;
      const { cpf } = req.body;

      Object.keys(req.body).forEach(function (value) {
        if (!req.body[value]) {
          throw new BaseError(`O valor '${value}' esta faltando`, 404);
        }
      });
      const userResult = await userDb.findOne({ _id: id });

      if (!userResult) {
        throw new BaseError("Usuário não encontrado ");
      }

      const outPutDTO = {
        name: userResult.name,
        email: userResult.email,
        cpf,
      };

      await userDb.findByIdAndUpdate(id, {
        cpf,
      });

      res.status(201).send({
        message: `CPF : ${cpf} , cadastrado com sucesso`,
      });
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ error: error.message });
    }
  }
  public static async getUserById(req: Request, res: Response) {
    try {
      const id = req.user.id;

      const adressResult = await adressDB.findOne({ id_user: id });
      const userResult = await userDb.findOne({ _id: id });

      if (!userResult) {
        throw new BaseError("Usuário não encontrado ");
      }

      const outPutDTO: IoutPutDTO = {
        name: userResult.name,
        email: userResult.email,
        cpf: userResult.cpf,
        adress: {
          street: adressResult?.street,
          complement: adressResult?.complement,
          neighbourhood: adressResult?.neighbourhood,
          number: adressResult?.number,
          city: adressResult?.city,
          state: adressResult?.state,
        },
      };

      res.status(200).send(outPutDTO);
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
          throw new BaseError(`A propriedade '${value}' esta faltando`, 404);
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
      cpf: "",
      password,
    };

    Object.keys(req.body).forEach(function (value) {
      if (!req.body[value]) {
        throw new BaseError(`A propriedade '${value}' esta faltando`, 404);
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
      id: userMongoDB._id.toString(),
      email: userMongoDB.email,
      hasAdress: userMongoDB.hasAdress,
    };
    const token = Authenticator.generateToken(userMongoDB._id.toString());

    userMongoDB.save((err: any) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(201).send({
          message: "Usuário cadastrado com sucesso !",
          user: outPutDTO,
          token,
        });
      }
    });
  }
}
export default UserController;
