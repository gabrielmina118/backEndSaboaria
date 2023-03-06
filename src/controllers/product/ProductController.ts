import { Request, Response } from "express";
import BaseError from "../../error/BaseError";
import { categoryDb } from "../../modelDB/Category";
import { essenceDb } from "../../modelDB/Essence";
import { productDb } from "../../modelDB/Products";
import { ICategories, Product } from "./interface/ICategories";

class ProductController {
  public static async create(req: Request, res: Response) {
    try {

      let essence = new essenceDb(req.body)

      essence.save((err: any) => {
        if (err) {
          res.status(500).send({ message: err.message });
        } else {
          res.status(201).send("Cadastrado com sucesso");
        }
      });
      
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
      const allProducts = await productDb.find();

      res.send(allProducts);
    } catch (error: any) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public static async allCategories(req:Request,res:Response){
    try {

      const allCategories = await categoryDb.find();
      res.send(allCategories)
      
    } catch (error:any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }
  public static async allEssences(req:Request,res:Response){
    try {

      const allEssences = await essenceDb.find();
      res.send(allEssences)
      
    } catch (error:any) {
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

      res.status(200).send(productId);
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }
}

export default ProductController;
