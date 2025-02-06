import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import CustomButton from "../components/custombutton";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CardScreen from "./CardScreen";
//import HomeScreen from "./src/screens/HomeScreen";

//สวัสดี
//2

const Tab = createBottomTabNavigator();

const HomeScreen = ({  }) => {
  return (
    
      <Tab.Navigator>
      

      <Tab.Screen name= "card" component={CardScreen} />

      </Tab.Navigator>
    
    
    
  );
};

const styles = StyleSheet.create({
  ViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  TextStyle: {
    fontSize: 30,
  },
});

export default HomeScreen;
