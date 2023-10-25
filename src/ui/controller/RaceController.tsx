import { useNavigation } from "@react-navigation/native";
import { Button, Text, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";
import { Race } from "../../domain/model/Race";
import { Circuit } from "../../domain/model/Circuit";
import { Location } from "../../domain/model/Location";

const RaceController = () => {
  const navigation = useNavigation();
  const race = new Race("", "", "", "", new Circuit("", "", "", new Location("", "", "", "")), new Date(), "");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button onPress={() => navigation.goBack()} title="BACK" />
      </View>
      <Text style={styles.title}>RACE ↓</Text>
      <View style={{ margin: 25 }}>
        <Text style={styles.text}>
          {race?.season} {race?.raceName}
        </Text>
        <Text style={styles.text}>
          {race?.circuit.circuitName} / {race?.circuit.location.country}
        </Text>
        <Text style={[styles.text, { marginBottom: 10 }]}>{race?.date.toString()}</Text>
        <Divider />
        <Text style={[styles.text, { marginTop: 10 }]}>Race results</Text>
        <View style={{}}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#1e1e1e",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    padding: 20,
    marginTop: 10,
    fontSize: 35,
  },
  title: {
    fontSize: 35,
    color: "#707079",
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    color: "#ffffff",
    marginTop: 5,
    marginBottom: 5,
  },
});

export default Race;
