class ProductData {
  public static async createEssence(essence:any) {
    essence.save((err: any) => {
      if (err) {
        return err.message;
      } else {
        return {message:"Cadastrado com sucesso"};
      }
    });
  }
}

export default ProductData;
