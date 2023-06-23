import EssencieData from "../../data/essencieData/EssencieData";

class AllEssencies {
  public static async allEssencie() {
    const allEssences = await EssencieData.getAllEssencies();

    return allEssences;
  }
}

export default AllEssencies;
