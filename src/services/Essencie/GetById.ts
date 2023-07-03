import EssencieData from "../../data/essencieData/EssencieData";
import BaseError from "../../error/BaseError";

class GetById {
  public static async getById(id: string) {
    const response = await EssencieData.getEssenceById(id);

    if (!response) {
      throw new BaseError(`Não é possível achar essência com id ${id}`);
    }

    return response;
  }
}
export default GetById;
