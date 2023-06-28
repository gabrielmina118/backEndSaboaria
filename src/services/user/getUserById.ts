import { IoutPutDTO } from "../../controllers/User/Interfaces/IoutPutDTO";
import AdressData from "../../data/adressData/AdressData";
import UserData from "../../data/userData/UserData";
import BaseError from "../../error/BaseError";

class GetUserById {
  public static async getUserById(id: string): Promise<IoutPutDTO> {
    const adressResult = await AdressData.getById(id);
    const userResult = await UserData.getById(id);

    if (!userResult) {
      throw new BaseError("Usuário não encontrado",404);
    }

    const outPutDTO: IoutPutDTO = {
      name: userResult.name,
      email: userResult.email,
      cpf: userResult.cpf,
      adress: {
        street: adressResult?.street,
        complement: adressResult?.complement,
        neighbourhood: adressResult?.neighbourhood,
        number: adressResult?.number,
        city: adressResult?.city,
        state: adressResult?.state,
      },
    };

    return outPutDTO;
  }
}

export default GetUserById;
