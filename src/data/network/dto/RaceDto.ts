import { FastestLap } from "../../../domain/model/FatestLap";
import { Race } from "../../../domain/model/Race";
import { RaceResult } from "../../../domain/model/RaceResult";
import { ResultTime } from "../../../domain/model/ResultTime";
import { CircuitDto, toCircuit } from "./CircuitDto";
import { ConstructorDto, toConstructor } from "./ConstructorDto";
import { DriverDto, toDriver } from "./DriverDto";

export interface RaceResponseDto {
  MRData: {
    limit: string;
    offset: string;
    series: string;
    total: string;
    url: string;
    xmlns: string;
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

export function toFatestLap(fatestLapDto: FastestLapDto): FastestLap {
  return new FastestLap(fatestLapDto.rank, fatestLapDto.lap, fatestLapDto.Time, fatestLapDto.AverageSpeed);
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

export function toResultTime(resultTimeDto: ResultTimeDto): ResultTime {
  return new ResultTime(resultTimeDto.millis, resultTimeDto.time);
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
    raceDto.time,
    raceDto.Results != undefined ? raceDto.Results.map((result) => toRaceResult(result)) : null
  );
}

export function toRaceResult(raceResultDto: RaceResultDto): RaceResult {
  return new RaceResult(
    raceResultDto.number,
    raceResultDto.position,
    raceResultDto.positionText,
    raceResultDto.points,
    toDriver(raceResultDto.Driver),
    toConstructor(raceResultDto.Constructor),
    raceResultDto.grid,
    raceResultDto.laps,
    raceResultDto.status,
    raceResultDto.Time != undefined ? toResultTime(raceResultDto.Time) : null,
    raceResultDto.FastestLap != undefined ? toFatestLap(raceResultDto.FastestLap) : null
  );
}
