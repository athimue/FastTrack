import { Location } from "../../../domain/model/Location";

export interface LocationDto {
  lat: string;
  long: string;
  locality: string;
  country: string;
}

export function toLocation(locationDto: LocationDto): Location {
  return new Location(locationDto.lat, locationDto.long, locationDto.locality, locationDto.country);
}
