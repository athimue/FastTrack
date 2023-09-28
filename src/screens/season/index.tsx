import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Linking, Image } from "react-native";
import { useGetCurrentSeasonQuery } from "../../store/api/seasonApi";
import { useNavigation } from "@react-navigation/native";

const Season = () => {
  const { data } = useGetCurrentSeasonQuery(null);
  const navigation = useNavigation();

  return (
    <View style={[styles.container, StyleSheet.absoluteFill]}>
      <FlatList
        data={data?.MRData.RaceTable?.Races}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.dataView}
            onPress={() => navigation.navigate("RaceResult", { raceId: item.round })}
          >
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
        )}
        numColumns={3}
        keyExtractor={(item) => item.round}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
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
    borderWidth: 1,
    padding: 5,
    margin: 5,
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
});

export default Season;
