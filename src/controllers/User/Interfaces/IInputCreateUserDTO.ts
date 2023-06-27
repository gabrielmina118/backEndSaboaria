interface Type {
    [key: string]: string | number | boolean;
  };

export interface IInputCreateUserDTO extends Type{
  name: string;
  email: string;
  cpf: string;
  password: string;
}
