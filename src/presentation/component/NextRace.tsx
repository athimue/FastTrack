import { Image, View, Text, StyleSheet } from "react-native";
import moment from "moment";
import { Race } from "../../domain/model/Race";

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    color: "#ffffff",
    padding: 10,
    textAlign: "center",
  },
  logo: {
    width: 70,
    height: 70,
  },
});

export type NextRaceProps = {
  nextRace: Race | undefined;
};

export const NextRace: React.FC<NextRaceProps> = ({ nextRace }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#707079",
        margin: 20,
        flexDirection: "row",
        alignSelf: "center",
        flex: 1,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.subtitle}>GP n°{nextRace?.round}</Text>
        <Text style={styles.subtitle}>
          {nextRace?.raceName} / {nextRace?.circuit.circuitName}
        </Text>
        <Text style={styles.subtitle}>
          {moment(nextRace?.date + " " + nextRace?.time, "YYYY-MM-DD hh:mm:ss").toString()}
        </Text>
      </View>
      <View style={{ flex: 1, alignContent: "center", justifyContent: "center", alignItems: "center" }}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://flagsapi.com/BE/flat/64.png",
          }}
        />
      </View>
    </View>
  );
};
