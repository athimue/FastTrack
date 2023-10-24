import { Circuit } from "./Circuit";
import { Practice } from "./Practise";
import { RaceResult } from "./RaceResult";

export class Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  circuit: Circuit;
  date: Date;
  time: string;
  results?: RaceResult[];
  firstPractice?: Practice;
  qualifying?: Practice;
  secondPractice?: Practice;
  sprint?: Practice;

  constructor(
    season: string,
    round: string,
    url: string,
    raceName: string,
    circuit: Circuit,
    date: Date,
    time: string
  ) {
    this.season = season;
    this.round = round;
    this.url = url;
    this.raceName = raceName;
    this.circuit = circuit;
    this.date = date;
    this.time = time;
  }
}
