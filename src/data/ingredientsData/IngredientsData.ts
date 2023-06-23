import { InputDTO } from "../../controllers/dashBoardController/ingredients/IInput";
import { ingredientDb } from "../../modelDB/Ingredients";

class IngredientsData {
  public static async create(input: InputDTO) {
    let ingredient = new ingredientDb(input);

    ingredient.save((err: any) => {
      if (err) {
        return err.message;
      } else {
        return { message: `Ingrediente ${input.nome} cadastrado com sucesso` };
      }
    });
    return `Ingrediente ${input.nome} cadastrado com sucesso`;
  }
}

export default IngredientsData;
