import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Linking, Image } from "react-native";
import { useGetCurrentSeasonQuery } from "../../store/api/seasonApi";
import { useNavigation } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { ActivityIndicator } from "@react-native-material/core";

function Loader({ isLoading }) {
  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }
  return null;
}

const Season = () => {
  const navigation = useNavigation();
  const [season, setSeason] = useState<string>("2023");
  const { data, isLoading } = useGetCurrentSeasonQuery(season);
  const spinnerChoices = [
    { key: "2023", value: "2023" },
    { key: "2022", value: "2022" },
    { key: "2021", value: "2021" },
    { key: "2020", value: "2020" },
    { key: "2019", value: "2019", disabled: true },
    { key: "2018", value: "2018" },
  ];

  const renderItem = ({ item, index }) => {
    const itemStyle = index % 2 === 0 ? [styles.dataView, styles.leftColumn] : [styles.dataView, styles.rightColumn];

    return (
      <TouchableOpacity style={itemStyle} onPress={() => navigation.navigate("RaceResult", { raceId: item.round })}>
        <Text style={styles.title}>GP : {item.round}</Text>
        <Text style={styles.subTitle}>{item.raceName}</Text>
        <Text style={styles.text}>
          {item.Circuit.circuitName} / {item.Circuit.Location.country}
        </Text>
        <Text style={styles.text}>Date : {item.date}</Text>
        <Text style={styles.text}>Time : {item.time}</Text>
        <Text style={styles.text} onPress={() => Linking.openURL(item.url)}>
          Wikipedia page
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, StyleSheet.absoluteFill]}>
      <Text>PLANNING OF THE SELECTED SEASON</Text>
      <SelectList
        boxStyles={{ marginVertical: 20 }}
        setSelected={(val: string) => setSeason(val)}
        data={spinnerChoices}
        placeholder={season}
        searchPlaceholder={season}
        save="value"
      />
      {!data && <Loader isLoading={isLoading} />}
      {data && (
        <FlatList
          data={data?.MRData.RaceTable.Races}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item) => item.round}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  header: {
    textAlign: "center",
    padding: 20,
    marginTop: 5,
    fontSize: 35,
    color: "#ffffff",
    backgroundColor: "#6C3082",
  },
  dataView: {
    flex: 1,
    padding: 5,
    margin: 5,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
  },
  leftColumn: {
    marginTop: 10,
  },
  rightColumn: {
    marginTop: 40,
  },
});

export default Season;
