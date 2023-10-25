import "reflect-metadata";
import axios from "axios";
import { RaceDto, RaceResponseDto } from "../dto/RaceDto";
import { injectable } from "inversify";
import { DriverStandingDto, DriverStandingsResponseDto } from "../dto/DriverStandingsDto";
import { ConstructorStandingDto, ConstructorStandingsResponseDto } from "../dto/ConstructorStandingsDto";

@injectable()
export class ErgastApi {
  baseUrl = "http://ergast.com/api/f1";

  // RACE API
  getLastRace = async (): Promise<RaceDto> => {
    return axios.get(`${this.baseUrl}/current/last/results.json`).then((response) => {
      let raceResponseDto: RaceResponseDto = response.data;
      return raceResponseDto.MRData.RaceTable.Races[0];
    });
  };

  getNextRace = async (): Promise<RaceDto> => {
    return axios.get(`${this.baseUrl}/current/next.json`).then((response) => {
      let raceResponseDto: RaceResponseDto = response.data;
      return raceResponseDto.MRData.RaceTable.Races[0];
    });
  };

  // SEASON API
  getSeason = async (season: number): Promise<RaceDto[]> => {
    return axios.get(`${this.baseUrl}/${season}.json`).then((response) => {
      let raceResponseDto: RaceResponseDto = response.data;
      return raceResponseDto.MRData.RaceTable.Races;
    });
  };

  getRaceResults = async (season: number, raceId: number): Promise<RaceDto> => {
    return axios.get(`${this.baseUrl}/${season}/${raceId}/results.json`).then((response) => {
      let raceResponseDto: RaceResponseDto = response.data;
      return raceResponseDto.MRData.RaceTable.Races[0];
    });
  };

  getCircuits = async (season: number): Promise<RaceDto> => {
    return axios.get(`${this.baseUrl}/${season}/circuits.json`).then((response) => {
      let raceResponseDto: RaceResponseDto = response.data;
      return raceResponseDto.MRData.RaceTable.Races[0];
    });
  };

  // DRIVER API
  getDrivers = async (): Promise<RaceDto> => {
    return axios.get(`${this.baseUrl}/drivers.json`).then((response) => {
      let raceResponseDto: RaceResponseDto = response.data;
      return raceResponseDto.MRData.RaceTable.Races[0];
    });
  };

  // STANDINGS API
  getDriverStandings = async (season: number): Promise<DriverStandingDto[]> => {
    return axios.get(`${this.baseUrl}/${season}/driverstandings.json`).then((response) => {
      let driverStandingsResponseDto: DriverStandingsResponseDto = response.data;
      return driverStandingsResponseDto.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    });
  };

  getConstructorStandings = async (season: number): Promise<ConstructorStandingDto[]> => {
    return axios.get(`${this.baseUrl}/${season}/constructorstandings.json`).then((response) => {
      let constructorStandingsResponse: ConstructorStandingsResponseDto = response.data;
      return constructorStandingsResponse.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    });
  };
}
