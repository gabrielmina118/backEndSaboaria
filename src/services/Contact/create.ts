import { IContactDTO } from "../../controllers/contact/interface/IContactDTO";
import ContactData from "../../data/contactData/ContactData";
import InvalidValue from "../invalidValue";

class CreateContact {
  public static async create(input: IContactDTO) {
    await InvalidValue.invalidValue(input);

    const contact = await ContactData.create(input);
    return contact;
  }
}
export default CreateContact;
