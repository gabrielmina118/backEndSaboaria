import { Request, Response } from "express";
import BaseError from "../../../error/BaseError";
import CategorieData from "../../../data/categorieData/CategorieData";

class CategoriesControllers {
  public static async allCategories(req: Request, res: Response) {
    try {
      const allCategories = await CategorieData.getAllCategories();
      res.status(200).send(allCategories);
    } catch (error: any) {
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    }
  }
}
export default CategoriesControllers;
