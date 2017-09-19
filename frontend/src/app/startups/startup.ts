export class Startup {

  constructor(
    public id: string,
    public lead_angel_id: string,
    public company_name: string,
    public oneliner: string,
    public industry: string,
    public website: string,
    public city: string,
    public country: string,
    public entrepreneur_name: string,
    public entrepreneur_email: string,
    public entrepreneur_phone: string,
    public round_size_and_open_tickets: string,
    public valuation: string,
    public committed_percentage: string,
    public pitch_deck_link: string,
    public created_at?: string,
    public updated_at?: string
  ) {};

}
