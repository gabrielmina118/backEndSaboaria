class ProductData {
  public static async createEssence(essence:any) {
    essence.save((err: any) => {
      if (err) {
        return err.message;
      } else {
        return "Cadastrado com sucesso";
      }
    });
  }
}

export default ProductData;
