import { IInputCreateUserDTO } from "../../controllers/User/Interfaces/IInputCreateUserDTO";
import UserData from "../../data/userData/UserData";
import BaseError from "../../error/BaseError";
import Authenticator from "../../libService/Authenticator";
import { HashManager } from "../../libService/HashManager";
import User from "../../model/User";
import { IOutPutCreateDTO } from "./interface/IOutPutCreateDTO";
import InvalidValue from "./invalidValue";

class CreateUser {
  public static async create(user: IInputCreateUserDTO) {
    await InvalidValue.invalidValue(user);
    const { name, email, cpf, password } = user;


    const emailAlreadExist = await UserData.findByEmail(email);

    if (emailAlreadExist) {
      throw new BaseError(`Email ${email} já cadastrado`, 401);
    }

    const hashPassword = await HashManager.HashCreate(password);

    const userModel = new User(name, email, cpf, hashPassword);
    const { message, userMongoDB } = await UserData.create(userModel);

    const userCreate: IOutPutCreateDTO = {
      id: userMongoDB._id.toString(),
      email: userMongoDB.email!,
      hasAdress: userMongoDB.hasAdress!,
    };
    const token = Authenticator.generateToken(userMongoDB._id.toString());

    return {
      userCreate,
      token,
      message,
    };
  }
}

export default CreateUser;
