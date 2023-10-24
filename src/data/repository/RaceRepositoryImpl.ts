import "reflect-metadata";
import { inject, injectable } from "inversify";
import { Race } from "../../domain/model/Race";
import { RaceRepository } from "../../domain/repository/RaceRepository";
import { ErgastApi } from "../network/api/ErgastApi";
import { toRace } from "../network/dto/RaceDto";
import { TYPES } from "../../inversify.config";

@injectable()
export class RaceRepositoryImpl implements RaceRepository {
  private ergastApi: ErgastApi;

  constructor(@inject(TYPES.ErgastApi) private ergastApiImpl: ErgastApi) {
    this.ergastApi = ergastApiImpl;
  }

  getLastRace = async (): Promise<Race> => {
    const raceDto = await this.ergastApi.getLastRace();
    return toRace(raceDto);
  };
}
