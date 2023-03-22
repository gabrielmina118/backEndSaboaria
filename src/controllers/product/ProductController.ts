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

interface DocumentResult<T> {
  _doc: T;
}
class ProductController {
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

  public static async get(req: Request, res: Response) {
    try {
      const allCategories = await categoryDb.find();
      const allProducts = await productDb.find();

      const allcategoriesObject: Record<string, ICategories> = {
        semCategoria: {
          _id: undefined,
          nome: "produtoSemCategoria",
          produtos: [],
        },
      };

      allCategories.map((category) => {
        allcategoriesObject[category._id.toString()] = {
          _id: category._id.toString(),
          nome: category.nome,
          produtos: [],
        };
      });

      allProducts.forEach(function (product: Product) {
        allcategoriesObject[
          product.categoria_id || "semCategoria"
        ].produtos.push(product);
      });

      res.send(Object.values(allcategoriesObject));
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }
  public static async getAll(req: Request, res: Response) {
    try {
      const { page } = req.query;
      let limit = 12;

      if (!page) {
        limit = 0;
      }
      let skip = limit * (Number(page) - 1);

      const allProducts = await productDb.find().skip(skip).limit(limit);

      res.send(allProducts);
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

  public static async getById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const productId = await productDb.findOne({ _id: id });

      if (!productId) {
        throw new BaseError("Produto não encontrado", 404);
      }

      const productRelative = await productDb.find({
        categoria_id: productId.categoria_id,
      });

      const ingredients = await ingredientDb.find({
        id: productId.categoria_id,
      });

      const newProductId = { ...productId._doc, ingredients };

      delete newProductId.ingredientes;

      res.status(200).send({ newProductId, productRelative });
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }

  public static async getByName(req: Request, res: Response) {
    try {
      const {nome} = req.query;
      const products = await productDb.find({ nome: {'$regex' : `^${nome}`, '$options' : 'i'} });

      if (!products.length) {
        throw new BaseError("Produto não encontrado", 404);
      }

      res.status(200).send(products);
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }
}

export default ProductController;
