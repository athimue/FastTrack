import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator, FlatList, ScrollView, Image } from "react-native";
import { useGetLastRaceQuery, useGetNextRaceQuery } from "../../data/store/api/raceApi";
import { Race } from "../../data/network/dto/RaceDto";
import CountDown from "react-native-countdown-component";
import moment from "moment";
import { DataTable, Divider } from "react-native-paper";

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
    <View style={{ backgroundColor: "#1e1e1e", flex: 1 }}>
      <ScrollView>
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
        <View style={{ margin: 25 }}>
          <Text style={styles.information}>
            {lastRace?.season} {lastRace?.raceName}
          </Text>
          <Text style={styles.information}>
            {lastRace?.Circuit.circuitName} / {lastRace?.Circuit.Location.country}
          </Text>
          <Text style={[styles.information, { marginBottom: 10 }]}>{lastRace?.date.toString()}</Text>
          <Divider />
          <Text style={[styles.information, { marginTop: 10 }]}>Race results</Text>
          <View style={{}}></View>
        </View>
      </ScrollView>
    </View>
  );
};

const NextRace = (nextRace: NextRaceProps) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#707079",
        margin: 20,
        flexDirection: "row",
        alignSelf: "center",
        flex: 1,
        width: "60%",
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.subtitle}>GP n°{nextRace?.race?.round}</Text>
        <Text style={styles.subtitle}>
          {nextRace?.race?.raceName} / {nextRace?.race?.Circuit.circuitName}
        </Text>
        <Text style={styles.subtitle}>{moment(nextRace?.race?.date + " " + nextRace?.race?.time).toString()}</Text>
      </View>
      <View style={{ flex: 1, alignContent: "center", justifyContent: "center", alignItems: "center" }}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://flagsapi.com/BE/flat/64.png",
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: "center",
    color: "#707079",
    fontFamily: "Avenir",
    padding: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 25,
    color: "#ffffff",
    fontFamily: "Avenir",
    padding: 10,
  },
  information: {
    fontSize: 20,
    color: "#ffffff",
    fontFamily: "Avenir",
    marginTop: 5,
    marginBottom: 5,
  },
  tableText: {
    color: "#ffffff",
    fontFamily: "Avenir",
  },
  logo: {
    width: 70,
    height: 70,
  },
});

export default Home;
