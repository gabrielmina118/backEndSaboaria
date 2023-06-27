import AdressData from "../../data/adressData/AdressData";

class GetAdress {
  public static async get(id: string) {
    const adress = await AdressData.getById(id);

    return adress ? adress : [];
  }
}

export default GetAdress;
