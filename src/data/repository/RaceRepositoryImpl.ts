import "reflect-metadata";
import { injectable } from "inversify";
import { Race } from "../../domain/model/Race";
import { RaceRepository } from "../../domain/repository/RaceRepository";
import { ErgastApi } from "../network/api/ErgastApi";
import { toRace } from "../network/dto/RaceDto";
import container, { TYPES } from "../../../inversify.config";

@injectable()
export class RaceRepositoryImpl implements RaceRepository {
  private ergastApi: ErgastApi = container.get(TYPES.ErgastApi);

  getNextRace = async (): Promise<Race> => {
    const raceDto = await this.ergastApi.getNextRace();
    return toRace(raceDto);
  };

  getLastRace = async (): Promise<Race> => {
    const raceDto = await this.ergastApi.getLastRace();
    return toRace(raceDto);
  };
}
