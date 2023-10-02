import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView, ActivityIndicator } from "react-native";
import {
  useGetCurrentDriverStandingsQuery,
  useGetCurrentConstructorStandingsQuery,
} from "../../store/api/standingsApi";
import { DataTable, Divider } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";

const Standings = () => {
  const [season, setSeason] = useState<string>("2023");
  const { data, isLoading } = useGetCurrentDriverStandingsQuery(season);
  const constructorStandings =
    useGetCurrentConstructorStandingsQuery(season).data?.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
  const spinnerChoices = [
    { key: "2023", value: "2023" },
    { key: "2022", value: "2022" },
    { key: "2021", value: "2021" },
    { key: "2020", value: "2020" },
    { key: "2019", value: "2019", disabled: true },
    { key: "2018", value: "2018" },
  ];

  return (
    <View style={[styles.container, StyleSheet.absoluteFill]}>
      <ScrollView style={StyleSheet.absoluteFill}>
        <Text>STANDINGS OF THE SELECTED SEASON</Text>
        <SelectList
          boxStyles={{ marginVertical: 20 }}
          setSelected={(val: string) => setSeason(val)}
          data={spinnerChoices}
          placeholder={season}
          searchPlaceholder={season}
          save="value"
        />
        {isLoading && <ActivityIndicator size="large" />}
        {data && (
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
                  data={data?.MRData.StandingsTable.StandingsLists[0].DriverStandings}
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
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});

export default Standings;
