class Adress {
  constructor(
    private id_user:string,
    private street: string,
    private complement: string | null = null,
    private neighbourhood: string,
    private number: number,
    private city: string,
    private state: string
  ) {}

  public getStreet(): string {
    return this.street;
  }
  public getComplement(): string | null {
    return this.complement;
  }
  public getNeighBourhood(): string {
    return this.neighbourhood;
  }
  public getNumber(): number {
    return this.number;
  }
  public getCity(): string {
    return this.city;
  }
  public getState(): string {
    return this.state;
  }
}

export default Adress;
