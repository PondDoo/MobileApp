
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import ComponentScreen from "./src/screens/ComponentScreen"; // เพิ่มบรรทัดนี้
import ListScreen from "./src/screens/ListScreen"; // เพิ่มบรรทัดนี้
import StateScreen from "./src/screens/StateScreen";
import ModalScreen from "./src/screens/ModalScreen";
import SwipeScreen from "./src/screens/SwipeScreen";
import CardScreen from "./src/screens/CardScreen";
import RegisForm from "./src/screens/RegisForm";
import LoadUser from "./src/screens/LoadUser";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <HomeScreen/>
    </NavigationContainer>
  );
};

export default App;

