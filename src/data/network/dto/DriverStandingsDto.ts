import { DriverStandings } from "../../../domain/model/DriverStandings";
import { ConstructorDto, toConstructor } from "./ConstructorDto";
import { DriverDto, toDriver } from "./DriverDto";

export interface DriverStandingsResponseDto {
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
  StandingsLists: StandingsListDto[];
}

export interface StandingsListDto {
  season: string;
  round: string;
  DriverStandings: DriverStandingDto[];
}

export interface DriverStandingDto {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: DriverDto;
  Constructors: ConstructorDto[];
}

export function toDriverStandings(driverStandingsDto: DriverStandingDto): DriverStandings {
  return new DriverStandings(
    driverStandingsDto.position,
    driverStandingsDto.positionText,
    driverStandingsDto.points,
    driverStandingsDto.wins,
    toDriver(driverStandingsDto.Driver),
    driverStandingsDto.Constructors.map((construtor) => toConstructor(construtor))
  );
}
