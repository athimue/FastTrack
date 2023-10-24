export class Location {
  lat: string;
  long: string;
  locality: string;
  country: string;

  constructor(lat: string, long: string, locality: string, country: string) {
    this.lat = lat;
    this.long = long;
    this.locality = locality;
    this.country = country;
  }
}
