import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import {
  useGetCurrentDriverStandingsQuery,
  useGetCurrentConstructorStandingsQuery,
} from "../../store/api/standingsApi";

const Standings = () => {
  const driverStandings =
    useGetCurrentDriverStandingsQuery(null).data?.MRData.StandingsTable?.StandingsLists[0].DriverStandings;
  const constructorStandings =
    useGetCurrentConstructorStandingsQuery(null).data?.MRData.StandingsTable?.StandingsLists[0].ConstructorStandings;

  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ margin: 20, fontSize: 30 }}>Drivers</Text>
          <FlatList
            data={driverStandings}
            renderItem={({ item: driverStanding, index }) => (
              <TouchableOpacity activeOpacity={0.7} key={index}>
                <Text>
                  {driverStanding.position} - {driverStanding.Driver.givenName} {driverStanding.Driver.familyName} -{" "}
                  {driverStanding.points}
                </Text>
              </TouchableOpacity>
            )}
            scrollEnabled={true}
            keyExtractor={(driverStanding) => driverStanding.position}
          />
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ margin: 20, fontSize: 30 }}>Constructors</Text>
          <FlatList
            data={constructorStandings}
            renderItem={({ item: constructorStandings, index }) => (
              <TouchableOpacity activeOpacity={0.7} key={index}>
                <Text>
                  {constructorStandings.position} - {constructorStandings.Constructor.name} -{" "}
                  {constructorStandings.points}
                </Text>
              </TouchableOpacity>
            )}
            scrollEnabled={true}
            keyExtractor={(driverStanding) => driverStanding.position}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#222",
    padding: 10,
  },
  btnText: {
    color: "#fff",
  },
});

export default Standings;
