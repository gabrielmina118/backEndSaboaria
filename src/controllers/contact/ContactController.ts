import { Request, Response } from "express";
import BaseError from "../../error/BaseError";
import { contactDb } from "../../modelDB/Contact";
import { IContactDTO } from "./interface/IContactDTO";
import CreateContact from "../../services/Contact/create";

class ContactController {
  public static async create(req: Request, res: Response) {
    try {
      const { name, email, text } = req.body;

      const inputDTO: IContactDTO = {
        nome: name,
        email,
        texto: text,
      };

      const message = await CreateContact.create(inputDTO);

      res.status(201).send({message});
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }
}

export default ContactController;
