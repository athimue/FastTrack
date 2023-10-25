import { Constructor } from "./Constructor";
import { Driver } from "./Driver";
import { FastestLap } from "./FatestLap";
import { ResultTime } from "./ResultTime";

export class RaceResult {
  number: string;
  position: string;
  positionText: string;
  points: string;
  driver: Driver;
  carConstructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  time: ResultTime | null;
  fatestLap: FastestLap;

  constructor(
    number: string,
    position: string,
    positionText: string,
    points: string,
    driver: Driver,
    carConstructor: Constructor,
    grid: string,
    laps: string,
    status: string,
    time: ResultTime | null,
    fatestLap: FastestLap
  ) {
    this.number = number;
    this.position = position;
    this.positionText = positionText;
    this.points = points;
    this.driver = driver;
    this.carConstructor = carConstructor;
    this.grid = grid;
    this.laps = laps;
    this.status = status;
    this.time = time;
    this.fatestLap = fatestLap;
  }
}
