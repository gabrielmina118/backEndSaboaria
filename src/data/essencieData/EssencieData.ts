import { essenceDb } from "../../modelDB/Essence";
import { IEssence } from "../../services/Essencie/interfaces/IEssence";

class EssencieData {
  private static async saveMongoDB(input: any) {
    let essence = new essenceDb(input);
    const response = essence.save((err: any) => {
      if (err) {
        return err.message;
      } else {
        return { message: "Cadastrado com sucesso" };
      }
    });
    return essence;
  }

  private static async deleteByIdMongoDB(id: string) {
    const response = await essenceDb.deleteOne({
      _id: id,
    });

    return response;
  }

  private static async getByIdMongoDb(id: string) {
    const essenceId = await essenceDb.findOne({ _id: id });
    return essenceId;
  }

  public static async getAllEssencies() {
    const allEssences = await essenceDb.find();
    return allEssences;
  }

  public static async createEssence(input: IEssence) {
    const response = await EssencieData.saveMongoDB(input);
    return response;
  }

  public static async deleteEssence(id: string) {
    const response = await EssencieData.deleteByIdMongoDB(id);
    return response.deletedCount ? true : false;
  }

  public static async getEssenceById(id: string) {
    const response = await EssencieData.getByIdMongoDb(id);
    return response ? response : false;
  }

  public static async findAndUpdateEssence(id: string, nome: string) {
    const essence = await essenceDb.findByIdAndUpdate(id, {
      nome,
    });

    return essence;
  }
}

export default EssencieData;
