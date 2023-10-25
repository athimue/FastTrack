import "reflect-metadata";
import axios from "axios";
import { RaceDto, RaceResponseDto } from "../dto/RaceDto";
import { injectable } from "inversify";

@injectable()
export class ErgastApi {
  baseUrl = "http://ergast.com/api/f1";
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
}
