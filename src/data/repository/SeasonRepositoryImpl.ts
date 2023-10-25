import "reflect-metadata";
import { inject, injectable } from "inversify";
import { Race } from "../../domain/model/Race";
import { RaceRepository } from "../../domain/repository/RaceRepository";
import { ErgastApi } from "../network/api/ErgastApi";
import { toRace } from "../network/dto/RaceDto";
import container, { TYPES } from "../../../inversify.config";
import { SeasonRepository } from "../../domain/repository/SeasonRepository";

@injectable()
export class SeasonRepositoryImpl implements SeasonRepository {
  private ergastApi: ErgastApi = container.get(TYPES.ErgastApi);

  getSeason = async (season: number): Promise<Race[]> => {
    const racesDto = await this.ergastApi.getSeason(season);
    return racesDto.map((raceDto) => toRace(raceDto));
  };

  getRaceResults = async (season: number, raceId: number): Promise<Race> => {
    const raceDto = await this.ergastApi.getRaceResults(season, raceId);
    return toRace(raceDto);
  };

  getCircuits = async (season: number): Promise<Race> => {
    const raceDto = await this.ergastApi.getCircuits(season);
    return toRace(raceDto);
  };
}
