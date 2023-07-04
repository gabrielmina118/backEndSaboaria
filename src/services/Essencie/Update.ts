import EssencieData from "../../data/essencieData/EssencieData";
import { IEssence } from "./interfaces/IEssence";

class UpdateEssence {
  public static async update(id: string, input: IEssence) {
    
    if (!input.nome) {
      throw new Error("Essencia não informada");
    }

    const response = await EssencieData.findAndUpdateEssence(id, input.nome);

    return response;
  }
}

export default UpdateEssence;
