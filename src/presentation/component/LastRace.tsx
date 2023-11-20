import { View, Text, StyleSheet, FlatList } from "react-native";
import { Race } from "../../domain/model/Race";
import { Divider } from "react-native-paper";
import { RaceStanding, RaceStandingsTable } from "./RaceStandingTable";

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
});

export type LastRaceProps = {
  lastRace: Race | undefined;
};

export const LastRace: React.FC<LastRaceProps> = ({ lastRace }) => {
  return (
    <View>
      <Text style={styles.title}>LAST RACE ↓</Text>
      <View style={{ margin: 15 }}>
        <Text style={styles.information}>
          {lastRace?.season} {lastRace?.raceName}
        </Text>
        <Text style={styles.information}>
          {lastRace?.circuit.circuitName} / {lastRace?.circuit.location.country}
        </Text>
        <Text style={[styles.information, { marginBottom: 10 }]}>{lastRace?.date.toString()}</Text>
        <Divider />
        <Text style={[styles.information, { marginTop: 10, textAlign: "center" }]}>LEADERBOARD</Text>
        <RaceStandingsTable
          standings={lastRace?.results?.map(
            (result) =>
              new RaceStanding(
                result.position,
                result.driver.familyName,
                result.carConstructor.name,
                result.time?.time ? result.time?.time : result.status,
                result.points
              )
          )}
        />
      </View>
    </View>
  );
};
