import "reflect-metadata";
import { Container } from "inversify";
import { RaceRepository } from "./src/domain/repository/RaceRepository";
import { RaceRepositoryImpl } from "./src/data/repository/RaceRepositoryImpl";
import { ErgastApi } from "./src/data/network/api/ErgastApi";
import { GetLastRaceUseCase } from "./src/domain/usecase/GetLastRaceUseCase";
import { GetNextRaceUseCase } from "./src/domain/usecase/GetNextRaceUseCase";
import { SeasonRepositoryImpl } from "./src/data/repository/SeasonRepositoryImpl";
import { SeasonRepository } from "./src/domain/repository/SeasonRepository";
import { GetSeasonPlanningUseCase } from "./src/domain/usecase/GetSeasonPLanningUseCase";

export const TYPES = {
  ErgastApi: Symbol.for("ErgastApi"),
  RaceRepository: Symbol.for("RaceRepository"),
  SeasonRepository: Symbol.for("SeasonRepository"),
  GetLastRaceUseCase: Symbol.for("GetLastRaceUseCase"),
  GetNextRaceUseCase: Symbol.for("GetNextRaceUseCase"),
  GetSeasonPlanningUseCase: Symbol.for("GetSeasonPlanningUseCase"),
};

const container = new Container();

// Lier l'interface UserService à son implémentation UserServiceImpl
container.bind<ErgastApi>(TYPES.ErgastApi).to(ErgastApi);
container.bind<RaceRepository>(TYPES.RaceRepository).to(RaceRepositoryImpl);
container.bind<SeasonRepository>(TYPES.SeasonRepository).to(SeasonRepositoryImpl);
container.bind<GetLastRaceUseCase>(TYPES.GetLastRaceUseCase).to(GetLastRaceUseCase);
container.bind<GetNextRaceUseCase>(TYPES.GetNextRaceUseCase).to(GetNextRaceUseCase);
container.bind<GetSeasonPlanningUseCase>(TYPES.GetSeasonPlanningUseCase).to(GetSeasonPlanningUseCase);

// Exporter le conteneur
export default container;
