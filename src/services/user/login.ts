import { InputDTO } from "../../controllers/User/Interfaces/IinputDTO";
import UserData from "../../data/userData/UserData";
import BaseError from "../../error/BaseError";
import Authenticator from "../../libService/Authenticator";
import { HashManager } from "../../libService/HashManager";
import { ILogin } from "./interface/ILogin";
import { IoutputDTO } from "./interface/IOutPutDTO";
import InvalidValue from "../invalidValue";

class Login {
  public static async Login(body: InputDTO): Promise<ILogin> {
    await InvalidValue.invalidValue(body);

    const { email, password } = body;

    const emailAlreadExist = await UserData.findByEmail(email);

    if (!emailAlreadExist) {
      throw new BaseError(`Email ${email} não cadastrado`, 404);
    }

    const verifyPassword = await HashManager.comparePassword(
      password,
      emailAlreadExist.password!
    );

    if (!verifyPassword) {
      throw new BaseError(`senha incorreta`, 401);
    }

    const user: IoutputDTO = {
      id: emailAlreadExist._id.toString(),
      email: emailAlreadExist.email!,
      cpf: emailAlreadExist.cpf!,
      hasAdress: emailAlreadExist.hasAdress!,
    };

    const token = Authenticator.generateToken(emailAlreadExist._id.toString());

    return {
      user,
      token,
    };
  }
}

export default Login;
