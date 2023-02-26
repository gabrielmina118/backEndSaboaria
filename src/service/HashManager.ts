import * as bcrypt from "bcrypt";
import { config } from "dotenv";
config();

export class HashManager {
  public static async HashCreate(plainText: string): Promise<string> {
    const rounds = Number(process.env.COST);
    const salt = await bcrypt.genSalt(rounds);
    const hashPassword = await bcrypt.hash(plainText, salt);
    return hashPassword;
  }

  public static async comparePassword(
    plainText: string,
    hashPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainText, hashPassword);
  }
}
