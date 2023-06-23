import { essenceDb } from "../../modelDB/Essence";
import { IEssence } from "../../services/Essencie/interfaces/IEssence";

class EssencieData {
  public static async getAllEssencies() {
    const allEssences = await essenceDb.find();
    return allEssences;
  }

  public static async createEssence(input: IEssence) {
    let essence: any = new essenceDb(input);
    essence.save((err: any) => {
      if (err) {
        return err.message;
      } else {
        return { message: "Cadastrado com sucesso" };
      }
    });
  }
}

export default EssencieData;
