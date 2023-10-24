import "reflect-metadata";
import { inject, injectable } from "inversify";
import { Race } from "../model/Race";
import { RaceRepository } from "../repository/RaceRepository";
import { TYPES } from "../../inversify.config";
import { resolve } from "inversify-react";

@injectable()
export class GetLastRaceUseCase {
  @resolve("RaceRepository")
  private raceRepository: RaceRepository;

  invoke = async (): Promise<Race> => {
    console.log("coucouuuu");
    return await this.raceRepository.getLastRace();
  };
}
