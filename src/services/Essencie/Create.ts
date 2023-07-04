import EssencieData from "../../data/essencieData/EssencieData";
import BaseError from "../../error/BaseError";
import { IEssence } from "./interfaces/IEssence";

class CreateEssence {
  public static async create(input: IEssence) {
    if (!input.nome) {
      throw new BaseError("Essencia não informada", 404);
    }

    const response = await EssencieData.createEssence(input);

    return response;
  }
}

export default CreateEssence;
