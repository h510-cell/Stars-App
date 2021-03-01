import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./screens/homeScreen";
import DetailsScreen from "./screens/DetailsScreen";

export default function App() {
  return <AppContainer />;
}

const appStackNavigator = createStackNavigator(
  {
    home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    Details: {
      screen: DetailsScreen
    }
  },
  {
    initialRouteName: "home"
  }
);

const AppContainer = createAppContainer(appStackNavigator);
