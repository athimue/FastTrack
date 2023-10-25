import "reflect-metadata";
import { injectable } from "inversify";
import { Race } from "../model/Race";
import { RaceRepository } from "../repository/RaceRepository";
import container, { TYPES } from "../../../inversify.config";
import { SeasonRepository } from "../repository/SeasonRepository";
import { StandingsRepository } from "../repository/StandingsRepository";
import { DriverStandings } from "../model/DriverStandings";

@injectable()
export class GetDriverStandingsUseCase {
  private standingsRepository: StandingsRepository = container.get(TYPES.StandingsRepository);

  invoke = async (season: number): Promise<DriverStandings[]> => {
    const result = await this.standingsRepository.getDriverStandings(season);
    return result;
  };
}
