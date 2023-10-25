import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";

const SearchController = () => {
  const navigation = useNavigation();
  const [season, setSeason] = useState<string>("");
  const [raceId, setRaceId] = useState<string>("");
  const [circuits, setCircuits] = useState<{}[]>([]);

  const seasonChoices = [
    { key: "2023", value: "2023" },
    { key: "2022", value: "2022" },
    { key: "2021", value: "2021" },
    { key: "2020", value: "2020" },
    { key: "2019", value: "2019" },
    { key: "2018", value: "2018" },
    { key: "2017", value: "2017" },
    { key: "2016", value: "2016" },
    { key: "2015", value: "2015" },
    { key: "2014", value: "2014" },
  ];

  /*
  useEffect(() => {
    let tampon: { key: string; value: string }[] = [];
    data?.MRData.CircuitTable.Circuits.map((circuit, index) =>
      tampon.push({ key: (index + 1).toString(), value: circuit.circuitName + " - " + circuit.Location.country })
    );
    setCircuits(tampon);
  }, [data]); */

  return (
    <View style={{ backgroundColor: "#1e1e1e", flex: 1 }}>
      <Text style={styles.title}>Search by Race</Text>
      <Text style={styles.title}>Search info based on year and circuit</Text>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, margin: 40 }}>
          <SelectList
            boxStyles={{ borderColor: "#ffffff" }}
            inputStyles={styles.whiteText}
            dropdownTextStyles={styles.whiteText}
            setSelected={(season: string) => setSeason(season)}
            data={seasonChoices}
            placeholder="Season"
            searchPlaceholder={season}
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
    color: "#ffffff",
    padding: 40,
  },
  whiteText: {
    color: "#ffffff",
  },
  button: {
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
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
