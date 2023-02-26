interface Type {
  [key: string]: string | number | boolean;
};

export interface ICreateUser extends Type {
  name: string;
  email: string;
  cpf: string;
  password: string;
}
