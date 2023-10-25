import { Circuit } from "../model/Circuit";
import { Race } from "../model/Race";

export interface SeasonRepository {
  getSeason: (season: number) => Promise<Race[]>;
  getRaceResults: (season: number, raceId: number) => Promise<Race>;
  getCircuits: (season: number) => Promise<Circuit[]>;
}
