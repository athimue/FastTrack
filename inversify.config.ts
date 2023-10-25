import "reflect-metadata";
import { Container } from "inversify";
import { RaceRepository } from "./src/domain/repository/RaceRepository";
import { RaceRepositoryImpl } from "./src/data/repository/RaceRepositoryImpl";
import { ErgastApi } from "./src/data/network/api/ErgastApi";
import { GetLastRaceUseCase } from "./src/domain/usecase/GetLastRaceUseCase";
import { GetNextRaceUseCase } from "./src/domain/usecase/GetNextRaceUseCase";
import { SeasonRepositoryImpl } from "./src/data/repository/SeasonRepositoryImpl";
import { SeasonRepository } from "./src/domain/repository/SeasonRepository";
import { StandingsRepository } from "./src/domain/repository/StandingsRepository";
import { StandingsRepositoryImpl } from "./src/data/repository/StandingsResponseImpl";
import { GetSeasonPlanningUseCase } from "./src/domain/usecase/GetSeasonPlanningUseCase";
import { GetDriverStandingsUseCase } from "./src/domain/usecase/GetDriverStandingsUseCase";
import { GetConstructorStandingsUseCase } from "./src/domain/usecase/GetConstructorStandingsUseCase";
import { GetCircuitsUseCase } from "./src/domain/usecase/GetCircuitsUseCase";
import { GetRaceUseCase } from "./src/domain/usecase/GetRaceUseCase";

export const TYPES = {
  // DATA SOURCE
  ErgastApi: Symbol.for("ErgastApi"),
  // REPOSITORY
  RaceRepository: Symbol.for("RaceRepository"),
  SeasonRepository: Symbol.for("SeasonRepository"),
  StandingsRepository: Symbol.for("StandingsRepository"),
  // USE CASE
  GetLastRaceUseCase: Symbol.for("GetLastRaceUseCase"),
  GetNextRaceUseCase: Symbol.for("GetNextRaceUseCase"),
  GetSeasonPlanningUseCase: Symbol.for("GetSeasonPlanningUseCase"),
  GetDriverStandingsUseCase: Symbol.for("GetDriverStandingsUseCase"),
  GetConstructorStandingsUseCase: Symbol.for("GetConstructorStandingsUseCase"),
  GetCircuitsUseCase: Symbol.for("GetCircuitsUseCase"),
  GetRaceUseCase: Symbol.for("GetRaceUseCase"),
};

const container = new Container();

// API
container.bind<ErgastApi>(TYPES.ErgastApi).to(ErgastApi);
// REPOSITORY
container.bind<RaceRepository>(TYPES.RaceRepository).to(RaceRepositoryImpl);
container.bind<SeasonRepository>(TYPES.SeasonRepository).to(SeasonRepositoryImpl);
container.bind<StandingsRepository>(TYPES.StandingsRepository).to(StandingsRepositoryImpl);
// USE CASE
container.bind<GetLastRaceUseCase>(TYPES.GetLastRaceUseCase).to(GetLastRaceUseCase);
container.bind<GetNextRaceUseCase>(TYPES.GetNextRaceUseCase).to(GetNextRaceUseCase);
container.bind<GetSeasonPlanningUseCase>(TYPES.GetSeasonPlanningUseCase).to(GetSeasonPlanningUseCase);
container.bind<GetDriverStandingsUseCase>(TYPES.GetDriverStandingsUseCase).to(GetDriverStandingsUseCase);
container.bind<GetConstructorStandingsUseCase>(TYPES.GetConstructorStandingsUseCase).to(GetConstructorStandingsUseCase);
container.bind<GetCircuitsUseCase>(TYPES.GetCircuitsUseCase).to(GetCircuitsUseCase);
container.bind<GetRaceUseCase>(TYPES.GetRaceUseCase).to(GetRaceUseCase);

// Exporter le conteneur
export default container;
