import "reflect-metadata";
import { injectable } from "inversify";
import { Race } from "../model/Race";
import container, { TYPES } from "../../../inversify.config";
import { SeasonRepository } from "../repository/SeasonRepository";

@injectable()
export class GetRaceUseCase {
  private seasonRepository: SeasonRepository = container.get(TYPES.SeasonRepository);

  invoke = async (season: number, raceId: number): Promise<Race> => {
    const result = await this.seasonRepository.getRaceResults(season, raceId);
    return result;
  };
}
