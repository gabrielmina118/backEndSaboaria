import { Request, Response } from "express";
import ProductBussines from "../../bussines/Produtct/ProductBussines";
import BaseError from "../../error/BaseError";
import { categoryDb } from "../../modelDB/Category";
import { essenceDb } from "../../modelDB/Essence";
import { ingredientDb } from "../../modelDB/Ingredients";
import { productDb } from "../../modelDB/Products";
import { ICategories, Product } from "./interface/ICategories";
import { IEssence } from "../../services/Essencie/interfaces/IEssence";
import { GetAllService } from "../../services/product/getAll";
import { GetByIdService } from "../../services/product/getById";
import { GetByNameService } from "../../services/product/getByName";

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

  
}

export default ProductController;
