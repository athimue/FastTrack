import "reflect-metadata";
import { injectable } from "inversify";
import { Race } from "../model/Race";
import { RaceRepository } from "../repository/RaceRepository";
import container, { TYPES } from "../../../inversify.config";
import { SeasonRepository } from "../repository/SeasonRepository";

@injectable()
export class GetSeasonPlanningUseCase {
  private seasonRepository: SeasonRepository = container.get(TYPES.SeasonRepository);

  invoke = async (season: number): Promise<Race[]> => {
    const result = await this.seasonRepository.getSeason(season);
    return result;
  };
}
