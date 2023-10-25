import { Constructor } from "./Constructor";
import { Driver } from "./Driver";

export class DriverStandings {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  driver: Driver;
  carConstructor: Constructor;

  constructor(
    position: string,
    positionText: string,
    points: string,
    wins: string,
    driver: Driver,
    constructor: Constructor
  ) {
    this.position = position;
    this.positionText = positionText;
    this.points = points;
    this.wins = wins;
    this.driver = driver;
    this.carConstructor = constructor;
  }
}
