import { FlatList, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";

export class RaceStanding {
  position: string;
  name: string;
  carConstructor: string;
  result: string;
  points: string;

  constructor(position: string, name: string, carConstructor: string, result: string, points: string) {
    this.position = position;
    this.name = name;
    this.carConstructor = carConstructor;
    this.result = result;
    this.points = points;
  }
}

export const RaceStandingsTable: React.FC<{ standings: RaceStanding[] }> = ({ standings }) => {
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title style={{ flex: 0.5 }} textStyle={{ color: "#ffffff" }}>
          Pos.
        </DataTable.Title>
        <DataTable.Title style={{ flex: 1 }} textStyle={{ color: "#ffffff" }}>
          Name
        </DataTable.Title>
        <DataTable.Title style={{ flex: 1 }} textStyle={{ color: "#ffffff" }}>
          Team
        </DataTable.Title>
        <DataTable.Title style={{ flex: 1 }} textStyle={{ color: "#ffffff" }}>
          Time
        </DataTable.Title>
        <DataTable.Title style={{ flex: 0.5 }} textStyle={{ color: "#ffffff" }}>
          Points
        </DataTable.Title>
      </DataTable.Header>
      <FlatList
        data={standings}
        renderItem={({ item, index }) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={{ flex: 0.5 }} textStyle={{ color: "#ffffff" }}>
              {item.position}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1 }} textStyle={{ color: "#ffffff" }}>
              {item.name}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1 }} textStyle={{ color: "#ffffff" }}>
              {item.carConstructor}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1 }} textStyle={{ color: "#ffffff" }}>
              {item.result}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 0.5 }} textStyle={{ color: "#ffffff" }}>
              {Number(item.points) > 0 ? "+" + item.points : "-"}
            </DataTable.Cell>
          </DataTable.Row>
        )}
        scrollEnabled={false}
        keyExtractor={(driverStanding) => driverStanding.position}
      />
    </DataTable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e1e1e",
    flex: 1,
  },
  title: {
    margin: 10,
    fontSize: 20,
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
  },
  cellTextStyle: {
    flex: 1,
    color: "#ffffff",
    textAlign: "center",
  },
});
