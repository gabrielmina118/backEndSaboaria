import {
  IEssenceDataBase,
} from "../../controllers/product/interface/IEssence";
import ProductData from "../../data/ProductData";
import { essenceDb } from "../../modelDB/Essence";
import { ingredientDb } from "../../modelDB/Ingredients";

class IngredientsBussines {
  public static async create(input: any) {

    if (!input.nome) {
      throw new Error("Essencia não informada");
    }

    let ingredient: any = new ingredientDb(input);

    const response = await ProductData.createIngredient(ingredient);

    return response;
  }
}

export default IngredientsBussines;
