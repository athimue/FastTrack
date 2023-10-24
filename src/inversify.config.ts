import { Container } from "inversify";
import { RaceRepository } from "./domain/repository/RaceRepository";
import { RaceRepositoryImpl } from "./data/repository/RaceRepositoryImpl";
import { ErgastApi } from "./data/network/api/ErgastApi";
import { GetLastRaceUseCase } from "./domain/usecase/GetLastRaceUseCase";

export const TYPES = {
  RaceRepository: Symbol.for("RaceRepository"),
  ErgastApi: Symbol.for("ErgastApi"),
  GetLastRaceUseCase: Symbol.for("GetLastRaceUseCase"),
};

const container = new Container();

container.bind(ErgastApi).toSelf();
container.bind<RaceRepository>(TYPES.RaceRepository).to(RaceRepositoryImpl);
container.bind(GetLastRaceUseCase).toSelf();

export default container;
