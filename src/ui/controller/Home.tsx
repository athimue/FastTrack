import "reflect-metadata";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator, ScrollView, Image } from "react-native";
import CountDown from "react-native-countdown-component";
import moment from "moment";
import { Divider } from "react-native-paper";
import { GetLastRaceUseCase } from "../../domain/usecase/GetLastRaceUseCase";
import { Race } from "../../domain/model/Race";
import { useContainer } from "inversify-react";

type NextRaceProps = {
  race: Race | undefined;
};

const HomeController: React.FC = () => {
  const getLastRaceUseCase = useContainer((container) => container.resolve(GetLastRaceUseCase));
  const [totalDuration, setTotalDuration] = useState<number>();
  const [lastRace, setLastRace] = useState<Race>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  useEffect((): void => {
    async () => {
      console.log("COUCOU");
      const lastRace = await getLastRaceUseCase.invoke();
      console.log(lastRace);
      setLastRace(lastRace);
    };
  }, []);

  //useEffect((): void => {
  //  if (lastRace != undefined && lastRace.date != undefined) {
  //    const currentDate = moment();
  //    const targetDate = moment(lastRace.date + " " + lastRace.time);
  //    const differenceInSeconds = targetDate.diff(currentDate, "seconds");
  //    setTotalDuration(differenceInSeconds);
  //  }
  // }, [totalDuration, lastRace]);

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
          {nextRace?.race?.raceName} / {nextRace?.race?.circuit.circuitName}
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

export default HomeController;
