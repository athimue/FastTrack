import { ConstructorStandings } from "../model/ConstructorStandings";
import { DriverStandings } from "../model/DriverStandings";

export interface StandingsRepository {
  getDriverStandings: (season: number) => Promise<DriverStandings[]>;
  getConstructorStandings: (season: number) => Promise<ConstructorStandings[]>;
}
