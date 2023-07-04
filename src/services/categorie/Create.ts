import { ICategory } from "../../controllers/dashBoardController/categories/interface/ICategory";
import CategorieData from "../../data/categorieData/CategorieData";
import BaseError from "../../error/BaseError";

class CreateCategory {
  public static async create(input: ICategory) {

    if (!input.nome) {
      throw new BaseError("Categoria não informada", 404);
    }

    const response = await CategorieData.createCategorie(input);

    return response;
  }
}

export default CreateCategory;
