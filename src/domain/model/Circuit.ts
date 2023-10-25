import { Location } from "./Location";

export class Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  location: Location;

  constructor(circuitId: string, url: string, circuitName: string, location: Location) {
    this.circuitId = circuitId;
    this.url = url;
    this.circuitName = circuitName;
    this.location = location;
  }
}
