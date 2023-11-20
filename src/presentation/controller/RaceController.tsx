import { useNavigation } from "@react-navigation/native";
import { Text, StyleSheet, View, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { DataTable, Divider } from "react-native-paper";
import { Race } from "../../domain/model/Race";
import { GetRaceUseCase } from "../../domain/usecase/GetRaceUseCase";
import container, { TYPES } from "../../../inversify.config";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RaceStanding, RaceStandingsTable } from "../component/RaceStandingTable";

export interface RaceRouteParams {
  season: number;
  raceId: number;
}

export const RaceController: React.FC = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { season, raceId }: RaceRouteParams = params;

  const [race, setRace] = useState<Race>();

  const getRaceUseCase: GetRaceUseCase = container.get(TYPES.GetRaceUseCase);

  useEffect(() => {
    (async () => {
      const race = await getRaceUseCase.invoke(season, raceId);
      setRace(race);
    })();
  }, [season, raceId]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>RACE ↓</Text>
      </View>
      <View style={{ margin: 25 }}>
        <Text style={styles.text}>
          {race?.season} {race?.raceName}
        </Text>
        <Text style={styles.text}>
          {race?.circuit.circuitName} / {race?.circuit.location.country}
        </Text>
        <Text style={[styles.text, { marginBottom: 10 }]}>{race?.date.toString()}</Text>
        <Divider />
        <Text style={[styles.text, { marginTop: 10, textAlign: "center", color: "#707079" }]}>LEADERBOARD</Text>
        <RaceStandingsTable
          standings={race?.results.map(
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#1e1e1e",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    padding: 20,
    marginTop: 10,
    fontSize: 35,
    alignItems: "center",
  },
  title: {
    width: "100%",
    fontSize: 35,
    color: "#707079",
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    color: "#ffffff",
    marginTop: 5,
    marginBottom: 5,
  },
});

export default Race;
