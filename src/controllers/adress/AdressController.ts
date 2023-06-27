import { Request, Response } from "express";
import BaseError from "../../error/BaseError";
import Adress from "../../model/Adress";
import { adressDB } from "../../modelDB/Adress";
import { userDb } from "../../modelDB/User";
import { IcreateAdress } from "./interface/IcreateAdress";
import CreateAdress from "../../services/Adress/create";
import GetAdress from "../../services/Adress/getAdress";

class AdressControler {
  public static async create(req: Request, res: Response) {
    try {
      const { street, complement, neighbourhood, number, city, state } =
        req.body;
      const id = req.user.id;

      const inputDTO: IcreateAdress = {
        id_user: id,
        street,
        complement,
        neighbourhood,
        number,
        city,
        state,
      };

      const createAdress = await CreateAdress.create(inputDTO, id);
      res.status(201).send(createAdress);
    } catch (error) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public static async get(req: Request, res: Response) {
    try {
      const id = req.user.id;

      const adress = await GetAdress.get(id);
      res.status(200).send(adress);
    } catch (error) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
}

export default AdressControler;
