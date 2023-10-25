import "reflect-metadata";
import { injectable } from "inversify";
import { ErgastApi } from "../network/api/ErgastApi";
import { toRace } from "../network/dto/RaceDto";
import container, { TYPES } from "../../../inversify.config";
import { StandingsRepository } from "../../domain/repository/StandingsRepository";
import { DriverStandings } from "../../domain/model/DriverStandings";
import { toDriverStandings } from "../network/dto/DriverStandingsDto";
import { ConstructorStandings } from "../../domain/model/ConstructorStandings";
import { toConstructorStandings } from "../network/dto/ConstructorStandingsDto";

@injectable()
export class StandingsRepositoryImpl implements StandingsRepository {
  private ergastApi: ErgastApi = container.get(TYPES.ErgastApi);

  getDriverStandings = async (season: number): Promise<DriverStandings[]> => {
    const driverStandingsDto = await this.ergastApi.getDriverStandings(season);
    return driverStandingsDto.map((driverDto) => toDriverStandings(driverDto));
  };

  getConstructorStandings = async (season: number): Promise<ConstructorStandings[]> => {
    const constructorStandingsDto = await this.ergastApi.getConstructorStandings(season);
    return constructorStandingsDto.map((constructorDto) => toConstructorStandings(constructorDto));
  };
}
