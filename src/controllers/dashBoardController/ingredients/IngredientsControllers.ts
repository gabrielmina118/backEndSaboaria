import { Request, Response } from "express";
import BaseError from "../../../error/BaseError";
import { InputDTO } from "./IInput";
import Create from "../../../services/Ingredient/Create";

class IngredientesControllers {
  public static async create(req: Request, res: Response) {
    try {
      const { nome } = req.body;

      const input: InputDTO = {
        id: 1,
        nome,
      };

      const createEssence = await Create.create(input)

      res
        .status(201)
        .send({ message:createEssence });
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }
}

export default IngredientesControllers;
