import { Circuit } from "./races";

export type CurrentSeasonResponse = {
  MRData: {
    RaceTable: CurrentSeasonTable;
    limit: number;
    offset: number;
    sefies: string;
    total: number;
    url: string;
    xmlns: string;
  };
};

export type CurrentSeasonTable = {
  season: string;
  Races: CurrentSeasonRace[];
};

export type CurrentSeasonRace = {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
  FirstPractice: Practice;
  SecondPractice: Practice;
  ThirdPractice: Practice;
  Qualifying: Practice;
};

export type Practice = {
  date: string;
  time: string;
};
