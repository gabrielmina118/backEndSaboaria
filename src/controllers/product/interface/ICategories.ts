

export interface Product{
  id?: string | undefined;
    nome?: string | undefined;
    foto?: string | undefined;
    preco?: number | undefined;
    quantidade?: number | undefined;
    ingredientes?: string | undefined;
    descricao?: string | undefined;
    tamanho?: string | undefined;
    categoria_id?: string | undefined;
}

export interface ICategories {
  _id: string | undefined;
  nome: string | undefined;
  produtos: Product[];
}
