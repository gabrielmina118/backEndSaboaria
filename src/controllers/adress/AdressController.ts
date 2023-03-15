import { Request, Response } from "express";
import BaseError from "../../error/BaseError";
import Adress from "../../model/Adress";
import { adressDB } from "../../modelDB/Adress";
import { userDb } from "../../modelDB/User";
import { IoutPutDTO } from "../User/Interfaces/IoutPutDTO";
import { IcreateAdress } from "./interface/IcreateAdress";

class AdressControler {
  static async create(req: Request, res: Response) {
    try {
      const { street, complement, neighbourhood, number, city, state } =
        req.body;
      const id = req.user.id;

      Object.keys(req.body).forEach(function (value) {
        if (!req.body[value]) {
          throw new BaseError(`O valor '${value}' esta faltando`, 404);
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

      await userDb.findByIdAndUpdate(id, {
        hasAdress: true,
      });

      adressMongoDB.save((err: any) => {
        if (err) {
          res.status(500).send({ message: err.message });
        } else {
          res.status(201).send({
            message: "Endereço cadastrado com sucesso!",
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
