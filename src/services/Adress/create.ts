import { IcreateAdress } from "../../controllers/adress/interface/IcreateAdress";
import AdressData from "../../data/adressData/AdressData";
import UserData from "../../data/userData/UserData";
import Adress from "../../model/Adress";
import InvalidValue from "../invalidValue";

class CreateAdress {
  public static async create(input: IcreateAdress, id: string) {
    await InvalidValue.invalidValue(input);

    const newAdress = new Adress(
      id,
      input.street,
      input.complement,
      input.neighbourhood,
      input.number,
      input.city,
      input.state
    );
    const message = await AdressData.create(newAdress);
    await UserData.UpdateAdressByUser(id);

    return { newAdress, message };
  }
}

export default CreateAdress;
