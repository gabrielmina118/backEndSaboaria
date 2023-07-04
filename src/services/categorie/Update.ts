import { ICategory } from "../../controllers/dashBoardController/categories/interface/ICategory";
import CategorieData from "../../data/categorieData/CategorieData";

class UpdateCategory {
  public static async update(id: string, input: ICategory) {
    
    if (!input.nome) {
      throw new Error("Categoria não informada");
    }

    const response = await CategorieData.findAndUpdateCategorie(id, input.nome);

    return response;
  }
}

export default UpdateCategory;
