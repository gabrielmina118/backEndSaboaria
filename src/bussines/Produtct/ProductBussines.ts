import {
  IEssence,
  IEssenceDataBase,
} from "../../controllers/product/interface/IEssence";
import ProductData from "../../data/ProductData";
import BaseError from "../../error/BaseError";
import { essenceDb } from "../../modelDB/Essence";

class ProductBussines {
  public static async create(input: IEssence) {

    if (!input.nome) {
      throw new BaseError("Essencia não informada", 404);
    }

    let essence: IEssenceDataBase = new essenceDb(input);

    const response = await ProductData.createEssence(essence);

    return response;
  }
}

export default ProductBussines;
