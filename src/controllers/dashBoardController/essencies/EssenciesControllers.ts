import { Request, Response } from "express";
import { IEssence } from "../../../services/Essencie/interfaces/IEssence";
import BaseError from "../../../error/BaseError";
import CreateEssence from "../../../services/Essencie/Create";
import AllEssencies from "../../../services/Essencie/allEssencies";
import DeleteEssence from "../../../services/Essencie/Delete";
import GetById from "../../../services/Essencie/GetById";
import UpdateEssence from "../../../services/Essencie/Update";

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
      res.status(200).send(allEssences);
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleteEssence = await DeleteEssence.delete(id);

      res.status(200).send({ message: deleteEssence });
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }

  public static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const getEssence = await GetById.getById(id);

      res.status(200).send({ message: getEssence });
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const essenceUpdate: IEssence = {
        nome: req.body.nome,
      };

      const updateEssence = await UpdateEssence.update(id, essenceUpdate);

      res
        .status(200)
        .send({ message: "Essência atualizada com sucesso", updateEssence });
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }
}

export default EssenciesControllers;
