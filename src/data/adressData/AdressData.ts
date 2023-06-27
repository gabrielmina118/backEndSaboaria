import BaseError from "../../error/BaseError";
import Adress from "../../model/Adress";
import { adressDB } from "../../modelDB/Adress";

class AdressData {
  public static async getById(idUser: string) {
    const adressResult = await adressDB.findOne({ id_user: idUser });
    return adressResult;
  }
  public static async create(newAdress: Adress) {
    let adressMongoDB = new adressDB(newAdress);

    adressMongoDB.save((err: any) => {
      if (err) {
        throw new BaseError(err.message,404) ;
      }
    });
    return "Endereço cadastrado com sucesso!";
  }
}

export default AdressData;
