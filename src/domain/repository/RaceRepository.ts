import { injectable } from "inversify";
import { Race } from "../model/Race";

export interface RaceRepository {
  getLastRace: () => Promise<Race>;
}
