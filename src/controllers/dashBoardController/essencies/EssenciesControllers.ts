import { Request, Response } from "express";
import { IEssence } from "../../../services/Essencie/interfaces/IEssence";
import BaseError from "../../../error/BaseError";
import CreateEssence from "../../../services/Essencie/Create";
import AllEssencies from "../../../services/Essencie/allEssencies";

class EssenciesControllers {
  public static async create(req: Request, res: Response) {
    try {
      const { nome } = req.body;

      const input: IEssence = {
        nome,
      };

      const createEssence = await CreateEssence.create(input);

      res
        .status(201)
        .send({ message: "Cadastrado com sucesso", createEssence });
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }

  public static async allEssences(req: Request, res: Response) {
    try {
      const allEssences = await AllEssencies.allEssencie();
      res.send(allEssences);
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }
}

export default EssenciesControllers;
