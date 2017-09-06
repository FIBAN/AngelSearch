export class Angel {

  static INVESTMENT_LEVELS = [
    "0 - 10,000 €",
    "10,000 - 100,000€",
    "100,000 - 1,000,000 €",
    "Over 1,000,000 €"
  ];

  constructor(
    public id: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    public phone?: string,
    public city?: string,
    public country?: string,
    public bio?: string,
    public auth0_id?: string,
    public industries?: string[],
    public network?: string,
    public linkedin?: string,
    public investment_level?: number
  ) {};

}
