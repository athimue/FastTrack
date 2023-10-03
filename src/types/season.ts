import { Circuit } from "./circuits";

export type SeasonResponse = {
  MRData: {
    RaceTable: SeasonTable;
    limit: number;
    offset: number;
    sefies: string;
    total: number;
    url: string;
    xmlns: string;
  };
};

export type SeasonTable = {
  season: string;
  Races: SeasonRace[];
};

export type SeasonRace = {
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
