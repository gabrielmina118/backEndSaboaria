import { categoryDb } from "../../modelDB/Category";
import { productDb } from "../../modelDB/Products";

class CategorieData {
  public static async getById(id: string) {
    const categorieId = await categoryDb.findOne({ _id: id });
    return categorieId;
  }
  public static async getAllCategories() {
    const allCategories = await categoryDb.find();
    return allCategories;
  }
}

export default CategorieData;
