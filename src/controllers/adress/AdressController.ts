import { Request, Response } from "express";
import BaseError from "../../error/BaseError";
import Adress from "../../model/Adress";
import { adressDB } from "../../modelDB/Adress";
import { userDb } from "../../modelDB/User";
import { IoutPutDTO } from "../User/Interfaces/IoutPutDTO";
import { IcreateAdress } from "./interface/IcreateAdress";

class AdressControler {
  public static async getUser(req: Request, res: Response) {
    try {
      const id = req.user.id;
      // const id = "63e3db1c475f3908c0afde9b";

      // const [user] = await adressDB.find({id_user:id})
      const [adressResult] = await adressDB.find({ id_user: id });
      const [userResult] = await userDb.find({ id_user: id });

      if (!userResult) {
        throw new Error("User not found ");
      }

      if (!adressResult) {
        throw new Error("Adress not found ");
      }

      const outPutDTO = {
        name: userResult.name,
        email: userResult.email,
        cpf: userResult.cpf,
        adress: {
          street: adressResult.street,
          complement: adressResult.complement,
          neighbourhood: adressResult.neighbourhood,
          number: adressResult.number,
          city: adressResult.city,
          state: adressResult.state,
        },
      };
      res.status(200).send(outPutDTO);
    } catch (error) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
  static async create(req: Request, res: Response) {
    try {
      const { street, complement, neighbourhood, number, city, state } =
        req.body;
      const id = req.user.id;

      Object.keys(req.body).forEach(function (value) {
        if (!req.body[value]) {
          throw new BaseError(`The proprety '${value}' is missing`, 404);
        }
      });

      const inputDTO: IcreateAdress = {
        id_user: id,
        street,
        complement,
        neighbourhood,
        number,
        city,
        state,
      };

      const adress = new Adress(
        id,
        inputDTO.street,
        inputDTO.complement,
        inputDTO.neighbourhood,
        inputDTO.number,
        inputDTO.city,
        inputDTO.state
      );

      let adressMongoDB = new adressDB(adress);

      adressMongoDB.save((err: any) => {
        if (err) {
          res.status(500).send({ message: err.message });
        } else {
          res.status(201).send({
            message: "successfully registered adress",
          });
        }
      });
    } catch (error) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
}

export default AdressControler;
