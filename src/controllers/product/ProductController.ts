import { Request, Response } from "express";
import { categoryDb } from "../../modelDB/Category";
import { productDb } from "../../modelDB/Products";

class ProductController {
  public static async get(req: Request, res: Response) {
    try {
      const allProducts = await productDb.find();
      const allCategories = await categoryDb.find();

      const concat = allCategories.map((category) => {
        console.log("category", category);
      });

      
      // res.status(200).json(concat);
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProductController;
