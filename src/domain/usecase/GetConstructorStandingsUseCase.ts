import "reflect-metadata";
import { injectable } from "inversify";
import { Race } from "../model/Race";
import container, { TYPES } from "../../../inversify.config";
import { SeasonRepository } from "../repository/SeasonRepository";
import { StandingsRepository } from "../repository/StandingsRepository";
import { ConstructorStandings } from "../model/ConstructorStandings";

@injectable()
export class GetConstructorStandingsUseCase {
  private standingsRepository: StandingsRepository = container.get(TYPES.StandingsRepository);

  invoke = async (season: number): Promise<ConstructorStandings[]> => {
    const result = await this.standingsRepository.getConstructorStandings(season);
    return result;
  };
}
