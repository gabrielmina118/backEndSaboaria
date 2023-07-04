import { Request, Response } from "express";
import BaseError from "../../../error/BaseError";
import CategorieData from "../../../data/categorieData/CategorieData";
import GetByIdService from "../../../services/categorie/getById";
import allCategories from "../../../services/categorie/allCategories";
import { ICategory } from "./interface/ICategory";
import CreateCategory from "../../../services/categorie/Create";
import DeleteCategory from "../../../services/categorie/Delete";
import UpdateCategory from "../../../services/categorie/Update";

class CategoriesControllers {
  public static async allCategories(req: Request, res: Response) {
    try {
      const categories = await allCategories.allEssencie();
      res.status(200).send(categories);
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

      const categorieId = await GetByIdService.getById(id);
      res.status(200).send(categorieId);
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }

  public static async create(req: Request, res: Response) {
    try {
      const { nome } = req.body;

      const input: ICategory = {
        nome,
      };

      const createCategory = await CreateCategory.create(input);

      res
        .status(201)
        .send({ message: "Cadastrado com sucesso", createCategory });
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

      const deleteCategory = await DeleteCategory.delete(id);

      res.status(200).send({ message: deleteCategory });
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

      const essenceUpdate: ICategory = {
        nome: req.body.nome,
      };

      const updateEssence = await UpdateCategory.update(id, essenceUpdate);

      res
        .status(200)
        .send({ message: "Categoria atualizada com sucesso", updateEssence });
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }
}
export default CategoriesControllers;
