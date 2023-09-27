import React from "react";
import { StyleSheet, Text, View, useWindowDimensions, FlatList, TouchableOpacity } from "react-native";
import { useGetAllDriversQuery } from "../../store/api/driverApi";

const Drivers = () => {
  const { height } = useWindowDimensions();
  const { data } = useGetAllDriversQuery(null);

  return (
    <View style={[styles.container, { height }, StyleSheet.absoluteFill]}>
      <Text>Drivers</Text>
      <View>
        <FlatList
          data={data?.MRData.DriverTable?.Drivers}
          renderItem={({ item: driver, index }) => (
            <TouchableOpacity activeOpacity={0.7} key={index}>
              <Text>
                {driver.familyName} {driver.givenName}
              </Text>
            </TouchableOpacity>
          )}
          style={{ flex: 1 }}
          scrollEnabled={true}
          keyExtractor={(driver) => driver.driverId}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  br: {
    height: 12,
  },
  btn: {
    backgroundColor: "#222",
    padding: 10,
  },
  btnText: {
    color: "#fff",
  },
});

export default Drivers;
