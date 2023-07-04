import { ICategory } from "../../controllers/dashBoardController/categories/interface/ICategory";
import { categoryDb } from "../../modelDB/Category";

class CategorieData {
  private static async saveMongoDB(input: any) {
    let categorie = new categoryDb(input);
    const response = categorie.save((err: any) => {
      if (err) {
        return err.message;
      } else {
        return { message: "Cadastrado com sucesso" };
      }
    });
    return categorie;
  }

  private static async deleteByIdMongoDB(id: string) {
    const response = await categoryDb.deleteOne({
      _id: id,
    });

    return response;
  }

  private static async getByIdMongoDb(id: string) {
    const essenceId = await categoryDb.findOne({ _id: id });
    return essenceId;
  }

  public static async getCategorieById(id: string) {
    const categorieId = await this.getByIdMongoDb(id);
    return categorieId;
  }

  public static async getAllCategories() {
    const allCategories = await categoryDb.find();
    return allCategories;
  }

  public static async createCategorie(input: ICategory) {
    const response = await CategorieData.saveMongoDB(input);
    return response;
  }

  public static async deleteCategorie(id: string) {
    const response = await CategorieData.deleteByIdMongoDB(id);
    return response.deletedCount ? true : false;
  }

  public static async findAndUpdateCategorie(id: string, nome: string) {
    const essence = await categoryDb.findByIdAndUpdate(id, {
      nome,
    });

    return essence;
  }
}

export default CategorieData;
