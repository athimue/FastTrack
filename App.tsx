import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Settings from "./src/screens/settings";
import Home from "./src/screens/home";
import React from "react";

const Tab = createMaterialTopTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
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
        <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: "Home" }} />
        <Tab.Screen name="Drivers" component={Settings} options={{ tabBarLabel: "Drivers" }} />
        <Tab.Screen name="Leagues" component={Settings} options={{ tabBarLabel: "Settings" }} />
        <Tab.Screen name="Settings" component={Settings} options={{ tabBarLabel: "Settings" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
