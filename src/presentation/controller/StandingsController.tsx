import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { seasonChoices } from "../constant/Constants";
import { GetDriverStandingsUseCase } from "../../domain/usecase/GetDriverStandingsUseCase";
import { GetConstructorStandingsUseCase } from "../../domain/usecase/GetConstructorStandingsUseCase";
import container, { TYPES } from "../../../inversify.config";
import { DriverStandings } from "../../domain/model/DriverStandings";
import { ConstructorStandings } from "../../domain/model/ConstructorStandings";
import { ProgressLoader } from "../component/ProgressLoader";
import { GeneralStanding, GeneralStandingsTable } from "../component/GeneralStandingTable";

const StandingsController: React.FC = () => {
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
        const constructors = await getConstructorStandingsUseCase.invoke(+season);
        setDrivers(drivers);
        setConstructors(constructors);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [season]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SEASON STANDINGS</Text>
      <SelectList
        boxStyles={{ borderColor: "#ffffff", margin: 10 }}
        inputStyles={{ color: "#ffffff" }}
        dropdownTextStyles={{ color: "#ffffff" }}
        setSelected={(val: string) => setSeason(val)}
        data={seasonChoices}
        placeholder={season}
        searchPlaceholder={season}
        save="key"
      />
      {isLoading && <ProgressLoader />}
      {!isLoading && (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <GeneralStandingsTable
            title={"DRIVER"}
            standings={drivers.map(
              (driver) => new GeneralStanding(driver.position, driver.driver.familyName, driver.points)
            )}
          />
          <GeneralStandingsTable
            title={"CONSTRUCTORS"}
            standings={constructors.map(
              (constructor) =>
                new GeneralStanding(constructor.position, constructor.carConstructor.name, constructor.points)
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e1e1e",
    flex: 1,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    color: "#707079",
    padding: 10,
    fontWeight: "bold",
  },
});

export default StandingsController;
