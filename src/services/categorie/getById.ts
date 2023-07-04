import CategorieData from "../../data/categorieData/CategorieData";
import BaseError from "../../error/BaseError";
class GetByIdService {
  static async getById(id: string) {
    const response = await CategorieData.getCategorieById(id);

    if (!response) {
      throw new BaseError(`Não é possível achar categoria com id ${id}`,404);
    }

    return response;
   
  }
}

export default GetByIdService
