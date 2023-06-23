import ProductData from "../../data/productData/ProductData";
import BaseError from "../../error/BaseError";

export class GetByIdService {
  static async getById(id: string) {
    const product = await ProductData.getProductbyId(id);

    if (!product) {
      throw new BaseError(`Não é possível encontrar produto com id ${id}`, 404);
    }

    const productRelative = await ProductData.getProductsRelative(
        product.categoria_id
    );

    const productIngredients = await ProductData.getProductIngredients(
        product.categoria_id
    );

    return { product, productRelative, productIngredients };
  }
}
