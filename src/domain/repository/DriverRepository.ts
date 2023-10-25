import { Race } from "../model/Race";

export interface DriverRepository {
  getDrivers: () => Promise<Race>;
}
