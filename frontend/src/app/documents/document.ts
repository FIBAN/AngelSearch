export class Document {

  static compareTypeAndName(d1: Document, d2: Document) {
    if (Document.compareFalsiness(d1, d2) !== 0) {
      return Document.compareFalsiness(d1, d2);
    }
    else if (Document.compareType(d1, d2) !== 0) {
      return Document.compareType(d1, d2);
    }
    else {
      return Document.compareName(d1, d2);
    }
  }

  static compareType(d1: Document, d2: Document) {
    const typeValues = {
      'folder': 0,
      'file': 1,
    };

    if (Document.compareFalsiness(d1, d2) !== 0) {
      return Document.compareFalsiness(d1, d2);
    }
    else {
      if (typeValues[d1.type] < typeValues[d2.type]) {
        return -1;
      }
      else if (typeValues[d1.type] > typeValues[d2.type]) {
        return 1;
      }
      else {
        return 0;
      }
    }
  }

  static compareName(d1: Document, d2: Document) {
    if (Document.compareFalsiness(d1, d2) !== 0) {
      return Document.compareFalsiness(d1, d2);
    }
    else {
      if (d1.name < d2.name) {
        return -1;
      }
      else if (d1.name > d2.name) {
        return 1;
      }
      else {
        return 0;
      }
    }
  }

  private static compareFalsiness(d1: Document, d2: Document) {
    if (!d1 && !d2) {
      return 0;
    }
    else if (!d1) {
      return 1;
    }
    else if (!d2) {
      return -1;
    }
    else {
      return 0;
    }
  }

  constructor(
    public id: string,
    public name: string,
    public type: string,
    public download_url: string,
    public parent?: string,
    public created_at?: string,
    public updated_at?: string
  ) {};

}
