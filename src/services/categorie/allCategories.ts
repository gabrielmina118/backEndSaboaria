import CategorieData from "../../data/categorieData/CategorieData";

class allCategories {
  public static async allEssencie() {
    const allEssences = await CategorieData.getAllCategories();

    return allEssences;
  }
}

export default allCategories;
