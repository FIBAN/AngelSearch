export class Angel {

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
    public industries?: string[]
  ) {};

}
