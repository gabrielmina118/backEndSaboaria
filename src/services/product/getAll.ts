import ProductData from "../../data/productData/ProductData";

export class GetAllService {
  static async getAll(page: any) {
    let limit: number = 10;

    if (!page) {
      limit = 0;
    }
    let skip = limit * (Number(page) - 1);

    const allProducts = await ProductData.getAllProducts(skip, limit);
    return allProducts;
  }
}
