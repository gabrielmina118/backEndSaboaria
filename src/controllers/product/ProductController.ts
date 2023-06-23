import { Request, Response } from "express";
import IngredientsBussines from "../../bussines/Ingredients/IngredientsBussines";
import ProductBussines from "../../bussines/Produtct/ProductBussines";
import BaseError from "../../error/BaseError";
import { categoryDb } from "../../modelDB/Category";
import { essenceDb } from "../../modelDB/Essence";
import { ingredientDb } from "../../modelDB/Ingredients";
import { productDb } from "../../modelDB/Products";
import { ICategories, Product } from "./interface/ICategories";
import { IEssence } from "./interface/IEssence";
import { GetAllService } from "../../services/product/getAll";
import { GetByIdService } from "../../services/product/getById";
import { GetByNameService } from "../../services/product/getByName";

interface DocumentResult<T> {
  _doc: T;
}
class ProductController {
  public static async getAll(req: Request, res: Response) {
    try {
      const { page } = req.query;

      const allProducts = await GetAllService.getAll(page);

      res.status(200).send(allProducts);
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }

  public static async getById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const productsById = await GetByIdService.getById(id);

      res.status(200).send(productsById);
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }

  public static async getByName(req: Request, res: Response) {
    try {
      const { nome } = req.query;

      const productsName = await GetByNameService.getByName(nome);

      res.status(200).send(productsName);
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }

  
  public static async createIngredients(req: Request, res: Response) {
    try {
      const { nome } = req.body;

      const input = {
        id: 1,
        nome,
      };

      const createEssence = await IngredientsBussines.create(input);

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

  public static async create(req: Request, res: Response) {
    try {
      const { nome } = req.body;

      const input: IEssence = {
        nome,
      };

      const createEssence = await ProductBussines.create(input);

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

  public static async allCategories(req: Request, res: Response) {
    try {
      const allCategories = await categoryDb.find();
      res.send(allCategories);
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }
  public static async allEssences(req: Request, res: Response) {
    try {
      const allEssences = await essenceDb.find();
      res.send(allEssences);
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }
}

export default ProductController;
