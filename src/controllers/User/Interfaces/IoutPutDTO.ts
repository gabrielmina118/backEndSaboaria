export interface IOutPutAdress{
  street:String| undefined;
  complement: String| undefined;
  neighbourhood: String| undefined;
  number: Number| undefined;
  city:String| undefined;
  state: String| undefined;
}
export interface IoutPutDTO {
  name:String | undefined;
  email: String| undefined;
  cpf: String| undefined;
  adress:IOutPutAdress;
}
