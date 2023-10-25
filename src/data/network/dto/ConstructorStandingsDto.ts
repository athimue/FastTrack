import { ConstructorStandings } from "../../../domain/model/ConstructorStandings";
import { ConstructorDto, toConstructor } from "./ConstructorDto";

export interface ConstructorStandingsResponseDto {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    StandingsTable: StandingsTableDto;
  };
}

export interface StandingsTableDto {
  season: string;
  StandingsLists: StandingsList[];
}

export interface StandingsList {
  season: string;
  round: string;
  ConstructorStandings: ConstructorStandingDto[];
}

export interface ConstructorStandingDto {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: ConstructorDto;
}

export function toConstructorStandings(constructorStandingsDto: ConstructorStandingDto): ConstructorStandings {
  return new ConstructorStandings(
    constructorStandingsDto.position,
    constructorStandingsDto.positionText,
    constructorStandingsDto.points,
    constructorStandingsDto.wins,
    toConstructor(constructorStandingsDto.Constructor)
  );
}
