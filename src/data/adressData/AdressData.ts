import { adressDB } from "../../modelDB/Adress";

class AdressData {
  public static async getById(idUser: string) {
    const adressResult = await adressDB.findOne({ id_user: idUser });
    return adressResult;
  }
}

export default AdressData;
