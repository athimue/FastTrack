import { Race } from "../../../domain/model/Race";
import { CircuitDto, toCircuit } from "./CircuitDto";
import { ConstructorDto } from "./ConstructorDto";
import { DriverDto } from "./DriverDto";

export interface RaceResponseDto {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    RaceTable: RaceTableDto;
  };
}

export interface RaceTableDto {
  season: string;
  round: string;
  Races: RaceDto[];
}

export interface RaceDto {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: CircuitDto;
  date: Date;
  time: string;
  Results?: RaceResultDto[];
  FirstPractice?: PracticeDto;
  Qualifying?: PracticeDto;
  SecondPractice?: PracticeDto;
  Sprint?: PracticeDto;
}

export interface RaceResultDto {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: DriverDto;
  Constructor: ConstructorDto;
  grid: string;
  laps: string;
  status: string;
  Time?: ResultTimeDto;
  FastestLap: FastestLapDto;
}

export interface FastestLapDto {
  rank: string;
  lap: string;
  Time: FastestLapTimeDto;
  AverageSpeed: AverageSpeedDto;
}

export interface AverageSpeedDto {
  units: string;
  speed: string;
}

export interface FastestLapTimeDto {
  time: string;
}

export interface ResultTimeDto {
  millis: string;
  time: string;
}

export interface PracticeDto {
  date: string;
  time: string;
}

export function toRace(raceDto: RaceDto): Race {
  return new Race(
    raceDto.season,
    raceDto.round,
    raceDto.url,
    raceDto.raceName,
    toCircuit(raceDto.Circuit),
    raceDto.date,
    raceDto.time
  );
}
