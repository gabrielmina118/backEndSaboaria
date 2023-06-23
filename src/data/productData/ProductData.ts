import { ingredientDb } from "../../modelDB/Ingredients";
import { productDb } from "../../modelDB/Products";

class ProductData {
  public static async getAllProducts(skip: number, limit: number) {
    const allProducts = await productDb.find().skip(skip).limit(limit);
    return allProducts;
  }

  public static async getProductbyId(id: string) {
    const productId = await productDb.findOne({ _id: id });
    return productId;
  }

  public static async getProductsRelative(categoriaId: any) {
    const productRelative = await productDb.find({
      categoria_id: categoriaId,
    });

    return productRelative;
  }

  public static async getProductIngredients(categoriaId: any) {
    const productIngredients = await ingredientDb.find({
      id: categoriaId,
    });
    console.log("Ingredientes dos produtos", productIngredients);

    return productIngredients;
  }
  public static async getProductByName(nome: string) {
    const products = await productDb.find({
      nome: { $regex: `^${nome}`, $options: "i" },
    });
    return products;
  }

  public static async createEssence(essence: any) {
    essence.save((err: any) => {
      if (err) {
        return err.message;
      } else {
        return { message: "Cadastrado com sucesso" };
      }
    });
  }

  public static async createIngredient(ingredient: any) {
    ingredient.save((err: any) => {
      if (err) {
        return err.message;
      } else {
        return { message: "Cadastrado com sucesso" };
      }
    });
  }
}

export default ProductData;
