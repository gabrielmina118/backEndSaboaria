import { categoryDb } from "../../modelDB/Category";
import { productDb } from "../../modelDB/Products";

class CategorieData {
  public static async getById(id: string) {
    const categorieId = await categoryDb.findOne({ _id: id });
    return categorieId;
  }
}

export default CategorieData;
