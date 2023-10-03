import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { useGetLastRaceQuery, useGetNextRaceQuery } from "../../store/api/raceApi";
import { Race } from "../../types/races";
import CountDown from "react-native-countdown-component";
import moment from "moment";
import { DataTable } from "react-native-paper";

type NextRaceProps = {
  race: Race | undefined;
};

const Home = () => {
  const { data, isLoading } = useGetNextRaceQuery(null);
  const lastRace = useGetLastRaceQuery(null).data?.MRData.RaceTable.Races[0];
  const [totalDuration, setTotalDuration] = useState<number>();

  useEffect(() => {
    if (data?.MRData.RaceTable.Races[0].date != undefined) {
      const currentDate = moment();
      const targetDate = moment(data?.MRData.RaceTable.Races[0].date + " " + data?.MRData.RaceTable.Races[0].time);
      const differenceInSeconds = targetDate.diff(currentDate, "seconds");
      setTotalDuration(differenceInSeconds);
    }
  }, [totalDuration, data]);

  return (
    <View style={[{ backgroundColor: "#1e1e1e" }]}>
      <Text style={styles.title}>NEXT RACE ↓</Text>
      {isLoading && <ActivityIndicator size="large" />}
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
      <NextRace race={data?.MRData.RaceTable.Races[0]} />
      <Text style={styles.title}>LAST RACE ↓</Text>
      <View style={{ margin: 20 }}>
        <Text style={styles.subtitle}>GP n°{lastRace?.round}</Text>
        <Text style={styles.subtitle}>
          {lastRace?.raceName} / {lastRace?.Circuit.circuitName} / {lastRace?.Circuit.Location.country}
        </Text>
        <Text style={styles.subtitle}>{moment(lastRace?.date + " " + lastRace?.time).toString()}</Text>
        <View style={{ margin: 20 }}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title textStyle={{ color: "#ffffff", fontFamily: "Avenir" }}>Position</DataTable.Title>
              <DataTable.Title textStyle={{ color: "#ffffff", fontFamily: "Avenir" }}>Name</DataTable.Title>
              <DataTable.Title textStyle={{ color: "#ffffff", fontFamily: "Avenir" }}>Time</DataTable.Title>
              <DataTable.Title textStyle={{ color: "#ffffff", fontFamily: "Avenir" }}>Status</DataTable.Title>
              <DataTable.Title textStyle={{ color: "#ffffff", fontFamily: "Avenir" }}>Points won</DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={lastRace?.Results}
              renderItem={({ item, index }) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell textStyle={{ color: "#ffffff", fontFamily: "Avenir" }}>
                    {item.position}
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: "#ffffff", fontFamily: "Avenir" }}>
                    {item.Driver.givenName} {item.Driver.familyName}
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: "#ffffff", fontFamily: "Avenir" }}>
                    {item.Time?.time}
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: "#ffffff", fontFamily: "Avenir" }}>{item.status}</DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: "#ffffff", fontFamily: "Avenir" }}>{item.points}</DataTable.Cell>
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

const NextRace = (nextRace: NextRaceProps) => {
  return (
    <View style={{ borderWidth: 1, borderColor: "#ffffff", margin: 20, alignItems: "center" }}>
      <Text style={styles.subtitle}>GP : {nextRace?.race?.round}</Text>
      <Text style={styles.subtitle}>
        {nextRace?.race?.raceName} / {nextRace?.race?.Circuit.circuitName} / {nextRace?.race?.Circuit.Location.country}
      </Text>
      <Text style={styles.subtitle}>{moment(nextRace?.race?.date + " " + nextRace?.race?.time).toString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: "center",
    color: "#ffffff",
    fontFamily: "Avenir",
    padding: 20,
  },
  subtitle: {
    fontSize: 25,
    color: "#ffffff",
    fontFamily: "Avenir",
    padding: 10,
  },
});

export default Home;
