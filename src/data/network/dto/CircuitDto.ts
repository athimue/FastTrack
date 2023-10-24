import { Circuit } from "../../../domain/model/Circuit";
import { LocationDto, toLocation } from "./LocationDto";

export interface CircuitsResponseDto {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    CircuitTable: CircuitsDto;
  };
}

export interface CircuitsDto {
  season: string;
  Circuits: CircuitDto[];
}

export interface CircuitDto {
  circuitId: string;
  url: string;
  circuitName: string;
  location: LocationDto;
}

export function toCircuit(circuitDto: CircuitDto): Circuit {
  return new Circuit(circuitDto.circuitId, circuitDto.url, circuitDto.circuitName, toLocation(circuitDto.location));
}
