import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Season from "./src/screens/season";
import React from "react";
import { Provider } from "react-redux";
import { Text } from "react-native";
import { store } from "./src/store/store";
import Standings from "./src/screens/standings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RaceResult from "./src/screens/raceresult";
import Search from "./src/screens/search";
import Home from "./src/screens/home";

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
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: "#ffffff",
            tabBarInactiveTintColor: "#f00201",
            tabBarStyle: { backgroundColor: "#1e1e1e" },
            tabBarIndicatorStyle: {
              backgroundColor: "#f00201",
            },
            tabBarLabelStyle: {
              fontSize: 25,
              fontFamily: "Radio+Canada",
            },
          }}
        >
          <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: "Home" }} />
          <Tab.Screen name="Search" component={Search} options={{ tabBarLabel: "Search" }} />
          <Tab.Screen name="Root" component={Planning} options={{ tabBarLabel: "Planning" }} />
          <Tab.Screen name="Standings" component={Standings} options={{ tabBarLabel: "Standings" }} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
