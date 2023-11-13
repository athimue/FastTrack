import "reflect-metadata";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "inversify-react";
import SearchController from "./src/presentation/controller/SearchController";
import SeasonController from "./src/presentation/controller/SeasonController";
import StandingsController from "./src/presentation/controller/StandingsController";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import container from "./inversify.config";
import { RaceController } from "./src/presentation/controller/RaceController";
import HomeController from "./src/presentation/controller/HomeController";

import Ionicons from "react-native-vector-icons/Ionicons";

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
      <Stack.Screen name="Search" component={SearchController} />
      <Stack.Screen name="Race" component={RaceController} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <Provider container={container}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: "#ffffff",
            tabBarInactiveTintColor: "#f00201",
            tabBarStyle: { backgroundColor: "#1e1e1e", paddingTop: 50 },
            tabBarIndicatorStyle: {
              backgroundColor: "#f00201",
            },
            tabBarLabelStyle: {
              fontSize: 18,
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeController}
            options={{
              tabBarIcon: ({ color }) => <Ionicons name="home" color={color} size={20} />,
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchStack}
            options={{
              tabBarIcon: ({ color }) => <Ionicons name="search" color={color} size={20} />,
            }}
          />
          <Tab.Screen
            name="Season"
            component={SeasonController}
            options={{
              tabBarIcon: ({ color }) => <Ionicons name="calendar" color={color} size={20} />,
            }}
          />
          <Tab.Screen
            name="Standings"
            component={StandingsController}
            options={{
              tabBarIcon: ({ color }) => <Ionicons name="trophy" color={color} size={20} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
