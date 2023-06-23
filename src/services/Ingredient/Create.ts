import { InputDTO } from "../../controllers/dashBoardController/ingredients/IInput";
import IngredientsData from "../../data/ingredientsData/IngredientsData";

class Create {
  public static async create(input: InputDTO) {
    if (!input.nome) {
      throw new Error("Ingrediente não informado");
    }

    const response: string = await IngredientsData.create(input);

    return response;
  }
}

export default Create;
