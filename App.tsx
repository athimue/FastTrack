import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Season from "./src/screens/season";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import Standings from "./src/screens/standings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RaceResult from "./src/screens/raceresult";
import { View } from "react-native";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function Planning() {
  return (
    <Stack.Navigator
      initialRouteName="Season"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Season" component={Season} />
      <Stack.Screen name="RaceResult" component={RaceResult} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Root"
          screenOptions={{
            tabBarActiveTintColor: "#6C3082",
            tabBarInactiveTintColor: "#6C3082",
            tabBarStyle: { backgroundColor: "#ffffffff" },
            tabBarIndicatorStyle: {
              backgroundColor: "#6C3082",
            },
            tabBarLabelStyle: {
              fontSize: 25,
              fontFamily: "Radio+Canada",
            },
          }}
        >
          <Tab.Screen name="Root" component={Planning} options={{ tabBarLabel: "Planning 2023" }} />
          <Tab.Screen name="Standings" component={Standings} options={{ tabBarLabel: "Standings 2023" }} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
