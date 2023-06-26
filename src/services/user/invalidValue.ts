import BaseError from "../../error/BaseError";

class InvalidValue {
  
  public static async invalidValue(body: any) {
    Object.keys(body).forEach(function (value) {
      if (!body[value]) {
        throw new BaseError(`O valor '${value}' esta faltando`, 404);
      }
    });
  }
}

export default InvalidValue;
