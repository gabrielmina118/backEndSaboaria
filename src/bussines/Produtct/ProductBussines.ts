import {
  IEssence,
  IEssenceDataBase,
} from "../../controllers/product/interface/IEssence";
import ProductData from "../../data/productData/ProductData";
import BaseError from "../../error/BaseError";
import { essenceDb } from "../../modelDB/Essence";

class ProductBussines {
  public static async create(input: IEssence) {

    if (!input.nome) {
      throw new Error("Essencia não informada");
    }

    let essence: IEssenceDataBase = new essenceDb(input);

    const response = await ProductData.createEssence(essence);

    return response;
  }
}

export default ProductBussines;
