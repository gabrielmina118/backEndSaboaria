import CategorieData from "../../data/categorieData/CategorieData";
import BaseError from "../../error/BaseError";

class DeleteCategory {
  public static async delete(id: string) {
    const response = await CategorieData.deleteCategorie(id);

    if (!response) {
      throw new BaseError(`Erro ao deletar a categoria com id:${id}`,404);
    }

    return response ? `Categoria com id :${id} deletada com sucesso` : "";
  }
}

export default DeleteCategory;
