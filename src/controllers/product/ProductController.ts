import { Request, Response } from "express";
import { categoryDb } from "../../modelDB/Category";
import { productDb } from "../../modelDB/Products";

class ProductController {
  public static async get(req: Request, res: Response) {
    try {
      const allCategories = await categoryDb.find();
     
      allCategories.map(async(category)=>{
        const product = await productDb.find({categoria_id:category._id.toString()});
        console.log(product)
      }) 
    
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProductController;
