import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView, ActivityIndicator } from "react-native";
import { DataTable, Divider } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import { seasonChoices } from "../constant/Constants";
import { GetDriverStandingsUseCase } from "../../domain/usecase/GetDriverStandingsUseCase";
import { GetConstructorStandingsUseCase } from "../../domain/usecase/GetConstructorStandingsUseCase";
import container, { TYPES } from "../../../inversify.config";
import { DriverStandings } from "../../domain/model/DriverStandings";
import { ConstructorStandings } from "../../domain/model/ConstructorStandings";

const StandingsController = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [season, setSeason] = useState<string>("2023");

  const [drivers, setDrivers] = useState<DriverStandings[]>([]);
  const [constructors, setConstructors] = useState<ConstructorStandings[]>([]);

  const getDriverStandingsUseCase: GetDriverStandingsUseCase = container.get(TYPES.GetDriverStandingsUseCase);
  const getConstructorStandingsUseCase: GetConstructorStandingsUseCase = container.get(
    TYPES.GetConstructorStandingsUseCase
  );

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const drivers = await getDriverStandingsUseCase.invoke(+season);
        setDrivers(drivers);
        const constructors = await getConstructorStandingsUseCase.invoke(+season);
        setConstructors(constructors);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [season]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>STANDINGS OF THE SELECTED SEASON</Text>
      <SelectList
        boxStyles={{ borderColor: "#ffffff" }}
        inputStyles={{ color: "#ffffff" }}
        dropdownTextStyles={{ color: "#ffffff" }}
        setSelected={(val: string) => setSeason(val)}
        data={seasonChoices}
        placeholder={season}
        searchPlaceholder={season}
        save="value"
      />
      {isLoading && <ActivityIndicator size="large" />}
      {!isLoading && (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, alignItems: "center", margin: 5 }}>
            <Text style={{ margin: 20, fontSize: 30, color: "#ffffff" }}>DRIVERS</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title textStyle={{ color: "#ffffff" }}>Position</DataTable.Title>
                <DataTable.Title textStyle={{ color: "#ffffff" }}>Name</DataTable.Title>
                <DataTable.Title textStyle={{ color: "#ffffff" }}>Points</DataTable.Title>
              </DataTable.Header>
              <FlatList
                data={drivers}
                renderItem={({ item: driverStanding, index }) => (
                  <DataTable.Row key={index}>
                    <DataTable.Cell textStyle={{ color: "#ffffff" }}>{driverStanding.position}</DataTable.Cell>
                    <DataTable.Cell textStyle={{ color: "#ffffff" }}>
                      {driverStanding.driver.givenName} {driverStanding.driver.familyName}
                    </DataTable.Cell>
                    <DataTable.Cell textStyle={{ color: "#ffffff" }}>{driverStanding.points}</DataTable.Cell>
                  </DataTable.Row>
                )}
                scrollEnabled={true}
                keyExtractor={(driverStanding) => driverStanding.position}
              />
            </DataTable>
          </View>
          <Divider horizontalInset />
          <View style={{ flex: 1, alignItems: "center", margin: 5 }}>
            <Text style={{ margin: 20, fontSize: 30, color: "#ffffff" }}>CONSTRUCTORS</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title textStyle={{ color: "#ffffff" }}>Position</DataTable.Title>
                <DataTable.Title textStyle={{ color: "#ffffff" }}>Name</DataTable.Title>
                <DataTable.Title textStyle={{ color: "#ffffff" }}>Points</DataTable.Title>
              </DataTable.Header>
              <FlatList
                data={constructors}
                renderItem={({ item: constructorStandings, index }) => (
                  <DataTable.Row key={index}>
                    <DataTable.Cell textStyle={{ color: "#ffffff" }}>{constructorStandings.position}</DataTable.Cell>
                    <DataTable.Cell textStyle={{ color: "#ffffff" }}>
                      {constructorStandings.carConstructor.name}
                    </DataTable.Cell>
                    <DataTable.Cell textStyle={{ color: "#ffffff" }}>{constructorStandings.points}</DataTable.Cell>
                  </DataTable.Row>
                )}
                scrollEnabled={true}
                keyExtractor={(driverStanding) => driverStanding.position}
              />
            </DataTable>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e1e1e",
    paddingHorizontal: 40,
    flex: 1,
  },
  header: {
    textAlign: "center",
    padding: 20,
    marginTop: 5,
    fontSize: 35,
    color: "#ffffff",
  },
});

export default StandingsController;
