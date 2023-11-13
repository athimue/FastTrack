import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { GetSeasonPlanningUseCase } from "../../domain/usecase/GetSeasonPlanningUseCase";
import container, { TYPES } from "../../../inversify.config";
import { SeasonRaceItem } from "../component/SeasonRaceItem";
import { seasonChoices } from "../constant/Constants";
import { ProgressLoader } from "../component/ProgressLoader";
import { Race } from "../../domain/model/Race";

const SeasonController = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [season, setSeason] = useState<string>("2023");

  const [races, setRaces] = useState<Race[]>([]);

  const getSeasonPlanningUseCase: GetSeasonPlanningUseCase = container.get(TYPES.GetSeasonPlanningUseCase);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const races = await getSeasonPlanningUseCase.invoke(+season);
        setRaces(races);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [season]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SEASON PLANNING</Text>
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
      {isLoading && <ProgressLoader />}
      {!isLoading && (
        <FlatList
          data={races}
          renderItem={({ item: race, index }) => (
            <SeasonRaceItem
              race={race}
              index={index}
              onClick={() => {
                navigation.navigate("Race", { season: race?.season, raceId: race?.round });
              }}
            />
          )}
          numColumns={2}
          keyExtractor={(race) => race.round}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e1e1e",
    paddingHorizontal: 10,
    flex: 1,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    color: "#707079",
    padding: 20,
    fontWeight: "bold",
  },
});

export default SeasonController;
