import { Request, Response } from "express";
import BaseError from "../../error/BaseError";
import { contactDb } from "../../modelDB/Contact";
import { IContactDTO } from "./interface/IContactDTO";

class ContactController {
  public static async create(req: Request, res: Response) {
    try {
      const { name, email, text } = req.body;

      Object.keys(req.body).forEach(function (value) {
        if (!req.body[value]) {
          throw new BaseError(`O valor de '${value}' esta faltando`, 404);
        }
      });

      const inputDTO: IContactDTO = {
        nome: name,
        email,
        texto: text,
      };

      let contactMongoDb = new contactDb(inputDTO);

      contactMongoDb.save((err: any) => {
        if (err) {
          res.status(500).send({ message: err.message });
        } else {
          res.status(201).send({
            message: `Mensagem enviada com sucesso , enviaremos um email em até 24hr para '${email}'`,
          });
        }
      });
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }
}

export default ContactController;
