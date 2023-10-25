import "reflect-metadata";
import { injectable } from "inversify";
import container, { TYPES } from "../../../inversify.config";
import { SeasonRepository } from "../repository/SeasonRepository";
import { Circuit } from "../model/Circuit";

@injectable()
export class GetCircuitsUseCase {
  private seasonRepository: SeasonRepository = container.get(TYPES.SeasonRepository);

  invoke = async (season: number): Promise<Circuit[]> => {
    const result = await this.seasonRepository.getCircuits(season);
    return result;
  };
}
