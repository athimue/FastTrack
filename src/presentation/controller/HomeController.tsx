import "reflect-metadata";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import CountDown from "react-native-countdown-component";
import { DataTable, Divider } from "react-native-paper";
import { GetLastRaceUseCase } from "../../domain/usecase/GetLastRaceUseCase";
import { Race } from "../../domain/model/Race";
import moment from "moment";
import container, { TYPES } from "../../../inversify.config";
import { GetNextRaceUseCase } from "../../domain/usecase/GetNextRaceUseCase";
import { NextRace } from "../component/NextRace";

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
    <View style={{ backgroundColor: "#1e1e1e", flex: 1 }}>
      <Text style={styles.title}>NEXT RACE ↓</Text>
      {totalDuration && (
        <CountDown
          until={totalDuration}
          timeToShow={["D", "H", "M", "S"]}
          onFinish={() => {}}
          onPress={() => {}}
          size={40}
          digitStyle={{ backgroundColor: "#ffffff" }}
          digitTxtStyle={{ color: "#f00201" }}
          timeLabels={{ d: "DD", h: "HH", m: "MM", s: "SS" }}
          timeLabelStyle={{ color: "#f00201" }}
          showSeparator
        />
      )}
      <NextRace race={nextRace} />
      <Text style={styles.title}>LAST RACE ↓</Text>
      <View style={{ margin: 25 }}>
        <Text style={styles.information}>
          {lastRace?.season} {lastRace?.raceName}
        </Text>
        <Text style={styles.information}>
          {lastRace?.circuit.circuitName} / {lastRace?.circuit.location.country}
        </Text>
        <Text style={[styles.information, { marginBottom: 10 }]}>{lastRace?.date.toString()}</Text>
        <Divider />
        <Text style={[styles.information, { marginTop: 10, textAlign: "center" }]}>LEADERBOARD</Text>
        <View style={{}}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title textStyle={{ color: "#ffffff" }}>Pos.</DataTable.Title>
              <DataTable.Title textStyle={{ color: "#ffffff" }}>Name</DataTable.Title>
              <DataTable.Title textStyle={{ color: "#ffffff" }}>Team</DataTable.Title>
              <DataTable.Title textStyle={{ color: "#ffffff" }}>Time / Status</DataTable.Title>
              <DataTable.Title textStyle={{ color: "#ffffff" }}>Points won</DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={lastRace?.results}
              renderItem={({ item, index }) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell textStyle={{ color: "#ffffff" }}>{item.position}</DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: "#ffffff" }}>
                    {item.driver.givenName} {item.driver.familyName}
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: "#ffffff" }}>{item.carConstructor.name}</DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: "#ffffff" }}>
                    {item.time?.time ? item.time?.time : item.status}
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: "#ffffff" }}>
                    {Number(item.points) > 0 ? "+" + item.points : "-"}
                  </DataTable.Cell>
                </DataTable.Row>
              )}
              scrollEnabled={true}
              keyExtractor={(driverStanding) => driverStanding.position}
            />
          </DataTable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: "center",
    color: "#707079",
    padding: 20,
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
