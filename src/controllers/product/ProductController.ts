import { Request, Response } from "express";
import { categoryDb } from "../../modelDB/Category";
import { productDb } from "../../modelDB/Products";
import { ICategories ,Products} from "./interface/ICategories";

class ProductController {
  public static async get(req: Request, res: Response) {
    try {
      const allCategories = await categoryDb.find();
      const allProducts = await productDb.find();
      
      const allcategoriesObject: Record<string, ICategories> = {
        semCategoria: { _id: undefined, nome: "produtoSemCategoria", produtos: [] },
      };

      allCategories.map((category) => {
        allcategoriesObject[category._id.toString()] = {
          _id: category._id.toString(),
          nome: category.nome,
          produtos: [],
        };
      });

      allProducts.forEach(function (product) {
        allcategoriesObject[product.categoria_id || "semCategoria"].produtos.push(product._doc);
      });

      res.send(Object.values(allcategoriesObject))
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProductController;
