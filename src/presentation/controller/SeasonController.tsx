import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { ActivityIndicator } from "@react-native-material/core";
import { GetSeasonPlanningUseCase } from "../../domain/usecase/GetSeasonPlanningUseCase";
import container, { TYPES } from "../../../inversify.config";
import { SeasonRaceItem } from "../component/SeasonRaceItem";
import { seasonChoices } from "../constant/Constants";

const SeasonController = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [season, setSeason] = useState<string>("2023");
  const [races, setRaces] = useState([]);

  const getSeasonPlanningUseCase: GetSeasonPlanningUseCase = container.get(TYPES.GetSeasonPlanningUseCase);

  useEffect(() => {
    (async () => {
      try {
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
      <Text style={styles.header}>PLANNING OF THE SELECTED SEASON</Text>
      <SelectList
        boxStyles={{ borderColor: "#ffffff" }}
        inputStyles={{ color: "#ffffff" }}
        dropdownTextStyles={{ color: "#ffffff" }}
        setSelected={(val: string) => setSeason(val)}
        data={seasonChoices}
        placeholder="SEASON"
        searchPlaceholder={season}
        save="value"
      />
      {isLoading && <ActivityIndicator size="large" />}
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
  header: {
    textAlign: "center",
    padding: 20,
    marginTop: 5,
    fontSize: 35,
    color: "#ffffff",
  },
});

export default SeasonController;
