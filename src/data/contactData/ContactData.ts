import { IContactDTO } from "../../controllers/contact/interface/IContactDTO";
import BaseError from "../../error/BaseError";
import { contactDb } from "../../modelDB/Contact";

class ContactData {
  public static async create(input: IContactDTO): Promise<string> {
    let contactMongoDb = new contactDb(input);
    contactMongoDb.save((err: any) => {
      if (err) {
        throw new BaseError(err.message, 404);
      }
    });
    return `Mensagem enviada com sucesso , enviaremos um email em até 24hr para '${input.email}'`;
  }
}

export default ContactData;
