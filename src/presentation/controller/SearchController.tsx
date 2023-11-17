import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { seasonChoices } from "../constant/Constants";
import { GetCircuitsUseCase } from "../../domain/usecase/GetCircuitsUseCase";
import container, { TYPES } from "../../../inversify.config";

const SearchController = () => {
  const navigation = useNavigation();

  const [season, setSeason] = useState<number>(seasonChoices[0].value);
  const [raceId, setRaceId] = useState<string>("");
  const [circuits, setCircuits] = useState<{}[]>([]);

  const getCircuitsUseCase: GetCircuitsUseCase = container.get(TYPES.GetCircuitsUseCase);

  useEffect(() => {
    (async () => {
      let tampon: { key: string; value: string }[] = [];
      const circuits = await getCircuitsUseCase.invoke(season);
      circuits.map((circuit, index) =>
        tampon.push({
          key: (index + 1).toString(),
          value: circuit.circuitName + " - " + circuit.location.country,
        })
      );
      setCircuits(tampon);
    })();
  }, [season]);

  return (
    <View style={{ backgroundColor: "#1e1e1e", flex: 1 }}>
      <Text style={styles.title}>SEARCH</Text>
      <Text style={styles.title}>Search info based on year and circuit</Text>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, margin: 40 }}>
          <SelectList
            boxStyles={{ borderColor: "#ffffff" }}
            inputStyles={styles.whiteText}
            dropdownTextStyles={styles.whiteText}
            setSelected={(season: number) => setSeason(season)}
            data={seasonChoices}
            placeholder="Season"
            searchPlaceholder={season.toString()}
            save="value"
          />
        </View>
        <View style={{ flex: 1, margin: 40, width: "40%" }}>
          <SelectList
            boxStyles={{ borderColor: "#ffffff" }}
            inputStyles={styles.whiteText}
            dropdownTextStyles={styles.whiteText}
            setSelected={(raceId: string) => setRaceId(raceId)}
            data={circuits}
            placeholder="Circuit"
            searchPlaceholder={raceId}
            save="key"
          />
        </View>
      </View>
      <Pressable style={styles.button} onPress={() => navigation.navigate("Race", { season: season, raceId: raceId })}>
        <Text style={styles.text}>Search race</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: "center",
    color: "#707079",
    padding: 20,
    fontWeight: "bold",
  },
  whiteText: {
    color: "#ffffff",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#707079",
    width: "50%",
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default SearchController;
