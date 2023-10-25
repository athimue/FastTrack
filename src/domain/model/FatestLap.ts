import { AverageSpeed } from "./AverageSpeed";
import { FastestLapTime } from "./FastestLapTime";

export class FastestLap {
  rank: string;
  lap: string;
  time: FastestLapTime;
  averageSpeed: AverageSpeed;

  constructor(rank: string, lap: string, time: FastestLapTime, averageSpeed: AverageSpeed) {
    this.rank = rank;
    this.lap = lap;
    this.time = time;
    this.averageSpeed = averageSpeed;
  }
}
