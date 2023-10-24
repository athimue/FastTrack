import "reflect-metadata";
import axios from "axios";
import { RaceDto, RaceResponseDto } from "../dto/RaceDto";

export class ErgastApi {
  baseUrl = "http://ergast.com/api/f1";
  getLastRace = async (): Promise<RaceDto> => {
    return axios.get(`${this.baseUrl}/current/last/results.json`).then((response) => {
      let raceResponseDto: RaceResponseDto = JSON.parse(response.data);
      return raceResponseDto.MRData.RaceTable.Races[0];
    });
  };
}
