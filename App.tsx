import "reflect-metadata";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import HomeController from "./src/ui/controller/HomeController";
import { Provider } from "inversify-react";
import SearchController from "./src/ui/controller/SearchController";
import SeasonController from "./src/ui/controller/SeasonController";
import StandingsController from "./src/ui/controller/StandingsController";
import container from "./inversify.config";

const Tab = createMaterialTopTabNavigator();

function App() {
  return (
    <Provider container={container}>
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
              fontSize: 13,
            },
          }}
        >
          <Tab.Screen name="Home" component={HomeController} options={{ tabBarLabel: "Home" }} />
          <Tab.Screen name="Search" component={SearchController} options={{ tabBarLabel: "Search" }} />
          <Tab.Screen name="Season" component={SeasonController} options={{ tabBarLabel: "Season" }} />
          <Tab.Screen name="Standings" component={StandingsController} options={{ tabBarLabel: "Standings" }} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
