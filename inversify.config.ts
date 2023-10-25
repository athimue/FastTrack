import "reflect-metadata";
import { Container } from "inversify";
import { RaceRepository } from "./src/domain/repository/RaceRepository";
import { RaceRepositoryImpl } from "./src/data/repository/RaceRepositoryImpl";
import { ErgastApi } from "./src/data/network/api/ErgastApi";
import { GetLastRaceUseCase } from "./src/domain/usecase/GetLastRaceUseCase";
import { GetNextRaceUseCase } from "./src/domain/usecase/GetNextRaceUseCase";

export const TYPES = {
  ErgastApi: Symbol.for("ErgastApi"),
  RaceRepository: Symbol.for("RaceRepository"),
  GetLastRaceUseCase: Symbol.for("GetLastRaceUseCase"),
  GetNextRaceUseCase: Symbol.for("GetNextRaceUseCase"),
};

// Créer un conteneur Inversify
const container = new Container();

// Lier l'interface UserService à son implémentation UserServiceImpl
container.bind<ErgastApi>(TYPES.ErgastApi).to(ErgastApi);
container.bind<RaceRepository>(TYPES.RaceRepository).to(RaceRepositoryImpl);
container.bind<GetLastRaceUseCase>(TYPES.GetLastRaceUseCase).to(GetLastRaceUseCase);
container.bind<GetNextRaceUseCase>(TYPES.GetNextRaceUseCase).to(GetNextRaceUseCase);

// Exporter le conteneur
export default container;
