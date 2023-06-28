import UserData from "../../data/userData/UserData";
import BaseError from "../../error/BaseError";
import { outPutDTO } from "./interface/outPutDTO";
class InsertCPF {
  public static async insertCpf(id: string, cpf: string): Promise<outPutDTO> {
    if (!cpf) {
      throw new BaseError("CPF deve ser enviado", 404);
    }

    await UserData.findAndUpdateByCPF(id, cpf);

    const outPutDTO: outPutDTO = {
      cpf,
    };

    return outPutDTO;
  }
}

export default InsertCPF;
