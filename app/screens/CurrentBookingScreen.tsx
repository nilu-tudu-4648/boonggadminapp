import React from "react";
import { View, StyleSheet } from "react-native";
import tw from "@/lib/tailwind";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

interface CurrentBookingScreenProps {}

const BottomTab = createBottomTabNavigator();

const CurrentBookingScreen: React.FC<CurrentBookingScreenProps> = (props) => {
  return <View style={tw``}>Hi in current booking screen</View>;
};

const styles = StyleSheet.create({
  container: {},
});

export default CurrentBookingScreen;
