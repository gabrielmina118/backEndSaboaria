import User from "../../model/User";
import { userDb } from "../../modelDB/User";

class UserData {
  public static async create(user: User) {
    let userMongoDB = new userDb(user);
    let message = "";
    userMongoDB.save((err: any) => {
      if (err) {
        message = err.message;
      } else {
        message = "Usuário cadastrado com sucesso !";
      }
    });
    message = `Usuário ${user.getName()} cadastrado com sucesso!`;

    return { message, userMongoDB };
  }

  public static async getById(id: string) {
    const userResult = await userDb.findOne({ _id: id });
    return userResult;
  }

  public static async findAndUpdateByCPF(
    id: string,
    cpf: string
  ): Promise<void> {
    await userDb.findByIdAndUpdate(id, {
      cpf,
    });
  }

  public static async findByEmail(email: string) {
    const [emailAlreadExist] = await userDb.find({ email });
    return emailAlreadExist;
  }
  public static async UpdateAdressByUser(id: string) {
    const adress = await userDb.findByIdAndUpdate(id, {
      hasAdress: true,
    });

    return adress
  }
}

export default UserData;
