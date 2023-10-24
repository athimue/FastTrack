import { ConstructorDto } from "./ConstructorDto";

export interface ConstructorStandingsReponse {
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
  ConstructorStandings: ConstructorStanding[];
}

export interface ConstructorStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: ConstructorDto;
}
