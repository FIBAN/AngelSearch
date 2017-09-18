export class Document {

  constructor(
    public id: string,
    public name: string,
    public type: string,
    public download_url: string,
    public created_at?: string,
    public updated_at?: string
  ) {};

}
