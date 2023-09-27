import React from "react";
import { StyleSheet, Text, View, useWindowDimensions, FlatList, TouchableOpacity } from "react-native";
import { useGetCurrentSeasonQuery } from "../../store/api/seasonApi";
import { Divider, Flex, HStack } from "@react-native-material/core";

const Home = () => {
  const { height } = useWindowDimensions();
  const { data } = useGetCurrentSeasonQuery(null);

  return (
    <View style={[styles.container, { height }, StyleSheet.absoluteFill]}>
      <Text style={styles.title}>Current Season : {data?.MRData.RaceTable.season}</Text>
      <FlatList
        data={data?.MRData.RaceTable?.Races}
        renderItem={({ item }) => (
          <View style={{ flex: 1, flexDirection: "column", margin: 10 }}>
            <Text>{item.raceName}</Text>
            <Text>{item.Circuit.circuitName}</Text>
            <Text>{item.Circuit.Location.country}</Text>
            <Text>{item.date}</Text>
            <Text>{item.round}</Text>
            <Text>{item.time}</Text>
            <Text>{item.url}</Text>
            <Divider style={{ marginTop: 10 }} leadingInset={16} />
          </View>
        )}
        numColumns={3}
        keyExtractor={(item) => item.round}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    textAlign: "center",
    padding: 20,
    marginTop: 35,
    fontSize: 35,
    backgroundColor: "#6C3082",
  },
  btn: {
    backgroundColor: "#222",
    padding: 10,
  },
  btnText: {
    color: "#fff",
  },
});

export default Home;
