import { Race } from "../model/Race";

export interface RaceRepository {
  getLastRace: () => Promise<Race>;
  getNextRace: () => Promise<Race>;
}
