import { useNavigation } from "@react-navigation/native";
import { Button, FlatList, Text, StyleSheet, View, Linking } from "react-native";
import { useGetSeasonRaceResultQuery } from "../../store/api/seasonApi";
import { useRoute } from "@react-navigation/native";

const RaceResult = () => {
  const navigation = useNavigation();
  const raceId = useRoute().params?.raceId;
  const race = useGetSeasonRaceResultQuery(raceId).data?.MRData.RaceTable.Races[0];

  return (
    <View style={[styles.container, StyleSheet.absoluteFill]}>
      <View style={styles.header}>
        <Button onPress={() => navigation.goBack()} title="BACK" />
        <Text style={styles.title}>Leaderboard : {race?.raceName}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.infoText}>GP : {race?.round}</Text>
        <Text style={styles.infoText}>Season : {race?.season}</Text>
        <Text style={styles.infoText}>Date : {race?.date.toString()}</Text>
        <Text style={styles.infoText}>Time : {race?.time}</Text>
      </View>
      <FlatList
        data={race?.Results}
        renderItem={({ item: result }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{result.position}</Text>
            <Text style={styles.cardText}>
              {result.Driver.givenName} {result.Driver.familyName}
            </Text>
            <Text style={styles.cardText}>{result.status}</Text>
            <Text style={styles.cardText}>{result.Time?.time}</Text>
            <Text style={styles.cardText}>{result.Constructor.name}</Text>
          </View>
        )}
        numColumns={1}
        keyExtractor={(item) => item.number}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  header: {
    flexDirection: "row",
    padding: 20,
    marginTop: 10,
    fontSize: 35,
    borderWidth: 1,
    borderColor: "#6C3082",
  },
  info: {
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
    margin: 20,
  },
  cardText: {
    marginLeft: 20,
    fontSize: 20,
  },
  title: {
    flex: 1,
    fontSize: 35,
    color: "#6C3082",
    textAlign: "center",
  },
  infoText: {
    fontSize: 30,
    margin: 2,
  },
});

export default RaceResult;
