import UserData from "../../data/userData/UserData";
import BaseError from "../../error/BaseError";
import { outPutDTO } from "./interface/outPutDTO";
class InsertCPF {
  public static async insertCpf(id: string, cpf: string): Promise<outPutDTO> {
    if (!cpf) {
      throw new BaseError("CPF deve ser enviado", 404);
    }

    const userResult = await UserData.getById(id);

    if (!userResult) {
      throw new BaseError("Usuário não encontrado", 404);
    }

    await UserData.findAndUpdateByCPF(id, cpf);

    const outPutDTO: outPutDTO = {
      name: userResult.name!,
      email: userResult.email!,
      cpf,
    };

    return outPutDTO;
  }
}

export default InsertCPF;
