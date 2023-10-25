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
  results?: RaceResult[] | null;
  firstPractice?: Practice | null;
  qualifying?: Practice | null;
  secondPractice?: Practice | null;
  sprint?: Practice | null;

  constructor(
    season: string,
    round: string,
    url: string,
    raceName: string,
    circuit: Circuit,
    date: Date,
    time: string,
    results?: RaceResult[],
    firstPractice?: Practice | null,
    qualifying?: Practice | null,
    secondPractice?: Practice | null,
    sprint?: Practice | null
  ) {
    this.season = season;
    this.round = round;
    this.url = url;
    this.raceName = raceName;
    this.circuit = circuit;
    this.date = date;
    this.time = time;
    this.results = results;
    this.firstPractice = firstPractice;
    this.qualifying = qualifying;
    this.secondPractice = secondPractice;
    this.sprint = sprint;
  }
}
