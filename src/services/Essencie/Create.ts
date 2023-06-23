import EssencieData from "../../data/essencieData/EssencieData";
import { IEssence } from "./interfaces/IEssence";

class CreateEssence {
  public static async create(input: IEssence) {
    if (!input.nome) {
      throw new Error("Essencia não informada");
    }

    const response = await EssencieData.createEssence(input);

    return response;
  }
}

export default CreateEssence;
