import ProductData from "../../data/productData/ProductData";
import BaseError from "../../error/BaseError";

export class GetByNameService {
  static async getByName(nome: any) {
    const products = await ProductData.getProductByName(nome);

    if (!products.length) {
      throw new BaseError(`Produto com nome ${nome} não encontrado`, 404);
    }

    // Caso a variavel nome não exista , retorna um array vazio. A tratativa é feita no front
    return !nome ? [] : products;
  }
}
