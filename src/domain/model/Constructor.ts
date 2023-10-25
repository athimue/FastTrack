export class Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;

  constructor(constructorId: string, url: string, name: string, nationality: string) {
    this.constructorId = constructorId;
    this.url = url;
    this.name = name;
    this.nationality = nationality;
  }
}
