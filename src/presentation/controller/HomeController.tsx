import "reflect-metadata";
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import CountDown from "react-native-countdown-component";
import { GetLastRaceUseCase } from "../../domain/usecase/GetLastRaceUseCase";
import { Race } from "../../domain/model/Race";
import moment from "moment";
import container, { TYPES } from "../../../inversify.config";
import { GetNextRaceUseCase } from "../../domain/usecase/GetNextRaceUseCase";
import { NextRace } from "../component/NextRace";
import { LastRace } from "../component/LastRace";

const HomeController: React.FC = () => {
  const getLastRaceUseCase: GetLastRaceUseCase = container.get(TYPES.GetLastRaceUseCase);
  const getNextRaceUseCase: GetNextRaceUseCase = container.get(TYPES.GetNextRaceUseCase);
  const [totalDuration, setTotalDuration] = useState<number>();
  const [lastRace, setLastRace] = useState<Race>();
  const [nextRace, setNextRace] = useState<Race>();

  useEffect(() => {
    (async () => {
      try {
        const nextRace = await getNextRaceUseCase.invoke();
        setNextRace(nextRace);
        const lastRace = await getLastRaceUseCase.invoke();
        setLastRace(lastRace);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect((): void => {
    if (lastRace != undefined) {
      const currentDate = moment();
      const targetDate = moment(lastRace.date + " " + lastRace.time);
      const differenceInSeconds = targetDate.diff(currentDate, "seconds");
      setTotalDuration(differenceInSeconds);
    }
  }, [totalDuration, lastRace]);

  return (
    <ScrollView style={{ backgroundColor: "#1e1e1e", flex: 1 }}>
      <Text style={styles.title}>NEXT RACE ↓</Text>
      {totalDuration && (
        <CountDown
          until={totalDuration}
          timeToShow={["D", "H", "M", "S"]}
          onFinish={() => {}}
          onPress={() => {}}
          size={30}
          digitStyle={{ backgroundColor: "#ffffff" }}
          digitTxtStyle={{ color: "#f00201" }}
          timeLabels={{ d: "DD", h: "HH", m: "MM", s: "SS" }}
          timeLabelStyle={{ color: "#f00201" }}
          showSeparator
        />
      )}
      <NextRace race={nextRace} />
      <LastRace lastRace={lastRace} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: "center",
    color: "#707079",
    padding: 10,
    fontWeight: "bold",
  },
  information: {
    fontSize: 20,
    color: "#ffffff",
    marginTop: 5,
    marginBottom: 5,
  },
  tableText: {
    color: "#ffffff",
  },
});

export default HomeController;
