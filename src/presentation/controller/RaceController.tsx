import { useNavigation } from "@react-navigation/native";
import { Text, StyleSheet, View, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { DataTable, Divider } from "react-native-paper";
import { Race } from "../../domain/model/Race";
import { GetRaceUseCase } from "../../domain/usecase/GetRaceUseCase";
import container, { TYPES } from "../../../inversify.config";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

export const RaceController = () => {
  const navigation = useNavigation();
  const season = useRoute().params?.season;
  const raceId = useRoute().params?.raceId;

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
              data={race?.results}
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
