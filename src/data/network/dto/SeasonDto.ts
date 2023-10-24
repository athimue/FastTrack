import { CircuitDto } from "./CircuitDto";
import { PracticeDto } from "./RaceDto";

export type SeasonResponseDto = {
  MRData: {
    RaceTable: SeasonTableDto;
    limit: number;
    offset: number;
    sefies: string;
    total: number;
    url: string;
    xmlns: string;
  };
};

export type SeasonTableDto = {
  season: string;
  Races: SeasonRaceDto[];
};

export type SeasonRaceDto = {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: CircuitDto;
  date: string;
  time: string;
  FirstPractice: PracticeDto;
  SecondPractice: PracticeDto;
  ThirdPractice: PracticeDto;
  Qualifying: PracticeDto;
};
