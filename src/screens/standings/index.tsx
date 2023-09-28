import React from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import {
  useGetCurrentDriverStandingsQuery,
  useGetCurrentConstructorStandingsQuery,
} from "../../store/api/standingsApi";
import { DataTable, Divider } from "react-native-paper";

const Standings = () => {
  const driverStandings =
    useGetCurrentDriverStandingsQuery(null).data?.MRData.StandingsTable?.StandingsLists[0].DriverStandings;
  const constructorStandings =
    useGetCurrentConstructorStandingsQuery(null).data?.MRData.StandingsTable?.StandingsLists[0].ConstructorStandings;

  return (
    <ScrollView style={StyleSheet.absoluteFill}>
      <Text style={{ margin: 20, fontSize: 30, textAlign: "center" }}>2023</Text>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1, alignItems: "center", margin: 5 }}>
          <Text style={{ margin: 20, fontSize: 30 }}>DRIVERS</Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Position</DataTable.Title>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Points</DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={driverStandings}
              renderItem={({ item: driverStanding, index }) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{driverStanding.position}</DataTable.Cell>
                  <DataTable.Cell>
                    {driverStanding.Driver.givenName} {driverStanding.Driver.familyName}
                  </DataTable.Cell>
                  <DataTable.Cell>{driverStanding.points}</DataTable.Cell>
                </DataTable.Row>
              )}
              scrollEnabled={true}
              keyExtractor={(driverStanding) => driverStanding.position}
            />
          </DataTable>
        </View>
        <Divider horizontalInset />
        <View style={{ flex: 1, alignItems: "center", margin: 5 }}>
          <Text style={{ margin: 20, fontSize: 30 }}>CONSTRUCTORS</Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Position</DataTable.Title>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Points</DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={constructorStandings}
              renderItem={({ item: constructorStandings, index }) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{constructorStandings.position}</DataTable.Cell>
                  <DataTable.Cell>{constructorStandings.Constructor.name}</DataTable.Cell>
                  <DataTable.Cell>{constructorStandings.points}</DataTable.Cell>
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

export default Standings;
