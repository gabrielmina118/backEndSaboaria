import EssencieData from "../../data/essencieData/EssencieData";
import BaseError from "../../error/BaseError";

class DeleteEssence {
  public static async delete(id: string) {
    const response = await EssencieData.deleteEssence(id);

    if (!response) {
      throw new BaseError(`Erro ao deletar a essência com id:${id}`);
    }

    return response ? `Essência com id :${id} deletada com sucesso` : "";
  }
}

export default DeleteEssence;
