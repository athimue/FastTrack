import { View, Text, StyleSheet, FlatList } from "react-native";
import { Race } from "../../domain/model/Race";
import { DataTable, Divider } from "react-native-paper";

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: "center",
    color: "#707079",
    padding: 10,
    fontWeight: "bold",
  },
  information: {
    fontSize: 20,
    color: "#ffffff",
    marginTop: 5,
    marginBottom: 5,
  },
});

export type LastRaceProps = {
  lastRace: Race | undefined;
};

export const LastRace: React.FC<LastRaceProps> = ({ lastRace }) => {
  return (
    <View>
      <Text style={styles.title}>LAST RACE ↓</Text>
      <View style={{ margin: 15 }}>
        <Text style={styles.information}>
          {lastRace?.season} {lastRace?.raceName}
        </Text>
        <Text style={styles.information}>
          {lastRace?.circuit.circuitName} / {lastRace?.circuit.location.country}
        </Text>
        <Text style={[styles.information, { marginBottom: 10 }]}>{lastRace?.date.toString()}</Text>
        <Divider />
        <Text style={[styles.information, { marginTop: 10, textAlign: "center" }]}>LEADERBOARD</Text>
        <View style={{}}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title textStyle={{ color: "#ffffff" }}>Pos.</DataTable.Title>
              <DataTable.Title textStyle={{ color: "#ffffff" }}>Name</DataTable.Title>
              <DataTable.Title textStyle={{ color: "#ffffff" }}>Team</DataTable.Title>
              <DataTable.Title textStyle={{ color: "#ffffff" }}>Time / Status</DataTable.Title>
              <DataTable.Title textStyle={{ color: "#ffffff" }}>Points won</DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={lastRace?.results}
              renderItem={({ item, index }) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell textStyle={{ color: "#ffffff" }}>{item.position}</DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: "#ffffff" }}>
                    {item.driver.givenName} {item.driver.familyName}
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: "#ffffff" }}>{item.carConstructor.name}</DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: "#ffffff" }}>
                    {item.time?.time ? item.time?.time : item.status}
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: "#ffffff" }}>
                    {Number(item.points) > 0 ? "+" + item.points : "-"}
                  </DataTable.Cell>
                </DataTable.Row>
              )}
              scrollEnabled={true}
              keyExtractor={(driverStanding) => driverStanding.position}
            />
          </DataTable>
        </View>
      </View>
    </View>
  );
};
