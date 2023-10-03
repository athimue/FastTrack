import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Season from "./src/screens/season";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import Standings from "./src/screens/standings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/home";
import Search from "./src/screens/search";
import Race from "./src/screens/race";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function SearchStack() {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Race" component={Race} />
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
          <Tab.Screen name="Search" component={SearchStack} options={{ tabBarLabel: "Search" }} />
          <Tab.Screen name="Season" component={Season} options={{ tabBarLabel: "Season" }} />
          <Tab.Screen name="Standings" component={Standings} options={{ tabBarLabel: "Standings" }} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
