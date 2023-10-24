import { ConstructorDto } from "./ConstructorDto";
import { DriverDto } from "./DriverDto";

export interface DriverStandingsReponse {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    StandingsTable: StandingsTable;
  };
}

export interface StandingsTable {
  season: string;
  StandingsLists: StandingsList[];
}

export interface StandingsList {
  season: string;
  round: string;
  DriverStandings: DriverStanding[];
}

export interface DriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: DriverDto;
  Constructors: ConstructorDto[];
}
