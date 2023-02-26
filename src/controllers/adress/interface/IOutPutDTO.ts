export interface IOutPutDTO {
  name: string;
  email: string;
  cpf: string;
  adress: {
    street: string;
    complement: string;
    neighbourhood: string;
    number: number;
    city: string;
    state: string;
  };
}
