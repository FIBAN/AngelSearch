export class Angel {

  static INVESTMENT_LEVELS = [
    '1',
    '2 - 5',
    '6 - 10',
    'Over 10'
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
    public industries?: string[],
    public network?: string,
    public linkedin?: string,
    public investment_level?: number,
    public is_hidden?: boolean,
    public created_at?: string,
    public updated_at?: string
  ) {};

}
