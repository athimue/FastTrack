import { Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Race } from "../../domain/model/Race";

type SeasonRaceItemProps = {
  race: Race;
  index: number;
  onClick: () => void;
};

const styles = StyleSheet.create({
  dataView: {
    flex: 1,
    padding: 5,
    margin: 5,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#707079",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  text: {
    fontSize: 18,
    color: "#ffffff",
  },
  leftColumn: {
    marginTop: 10,
  },
  rightColumn: {
    marginTop: 40,
  },
});

export const SeasonRaceItem: React.FC<SeasonRaceItemProps> = ({ race, index, onClick }) => {
  const itemStyle = index % 2 === 0 ? [styles.dataView, styles.leftColumn] : [styles.dataView, styles.rightColumn];

  return (
    <TouchableOpacity style={itemStyle} onPress={() => onClick()}>
      <Text style={styles.title}>GP : {race?.round}</Text>
      <Text style={styles.subTitle}>{race?.raceName}</Text>
      <Text style={styles.text}>
        {race?.circuit?.circuitName} / {race?.circuit?.location?.country}
      </Text>
      <Text style={styles.text}>Date : {race?.date?.toString()}</Text>
      <Text style={styles.text}>Time : {race?.time}</Text>
      <Text style={styles.text} onPress={() => Linking.openURL(race?.url)}>
        Wikipedia page
      </Text>
    </TouchableOpacity>
  );
};
