import { Request, Response } from "express";
import { productDb } from "../../modelDB/Products";


class ProductController {
  public static async get(req: Request, res: Response) {
    try {
      const allCategories = await productDb.find();
      res.status(200).json(allCategories);
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProductController;
