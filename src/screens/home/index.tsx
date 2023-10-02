import React from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>HOME SCREEN</Text>
    </View>
  );
};

export default Home;
