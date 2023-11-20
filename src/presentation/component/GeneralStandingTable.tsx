import { ScrollView, StyleSheet, Text } from "react-native";
import { DataTable } from "react-native-paper";

export class GeneralStanding {
  position: string;
  name: string;
  points: string;

  constructor(position: string, name: string, points: string) {
    this.position = position;
    this.name = name;
    this.points = points;
  }
}

export const GeneralStandingsTable: React.FC<{ title: string; standings: GeneralStanding[] }> = ({
  title,
  standings,
}) => {
  return (
    <ScrollView style={{ flex: 1, padding: 5 }}>
      <Text style={styles.title}>{title}</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{ flex: 0.5 }} textStyle={styles.cellTextStyle}>
            Pos.
          </DataTable.Title>
          <DataTable.Title style={{ flex: 1.5 }} textStyle={styles.cellTextStyle}>
            Name
          </DataTable.Title>
          <DataTable.Title style={{ flex: 0.8 }} textStyle={styles.cellTextStyle}>
            Points
          </DataTable.Title>
        </DataTable.Header>
        <ScrollView style={{ flex: 1 }}>
          <DataTable>
            {standings.map((item, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell style={{ flex: 0.5 }} textStyle={styles.cellTextStyle}>
                  {item.position}
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 1.5 }} textStyle={styles.cellTextStyle}>
                  {item.name}
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 0.8 }} textStyle={styles.cellTextStyle}>
                  {item.points}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>
      </DataTable>
    </ScrollView>
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
