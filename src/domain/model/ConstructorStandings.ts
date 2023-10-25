import { Constructor } from "./Constructor";
import { Driver } from "./Driver";

export class ConstructorStandings {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  carConstructor: Constructor;

  constructor(position: string, positionText: string, points: string, wins: string, constructor: Constructor) {
    this.position = position;
    this.positionText = positionText;
    this.points = points;
    this.wins = wins;
    this.carConstructor = constructor;
  }
}
