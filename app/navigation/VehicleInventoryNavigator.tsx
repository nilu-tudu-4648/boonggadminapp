import AppText from "@/components/AppText";
import tw from "@/lib/tailwind";
import OnbookingScreen from "@/screens/OnbookingScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import AvailableNavigator from "./AvailableNavigator";
import ManitenanceNavigator from "./ManitenanceNavigator";
import routes from "./routes";

const Tab = createMaterialTopTabNavigator();

interface VehicleInventoryNavigatorProps {}

const VehicleInventoryNavigator: React.FC<VehicleInventoryNavigatorProps> = (props) => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarStyle: tw`bg-violet-800`,
        tabBarLabelStyle: tw`text-neutral-200`,
        tabBarIndicatorStyle: tw`bg-neutral-200`,
        tabBarActiveTintColor: tw.color(`text-neutral-200`),
      })}>
      <Tab.Screen
        name={routes.AVAILABLE.label}
        component={AvailableNavigator}
        options={() => ({
          tabBarLabel: ({ color }) => (
            <AppText
              style={tw.style(` text-sm font-medium text-center`, {
                color,
              })}>
              {routes.AVAILABLE.label}
            </AppText>
          ),
        })}
      />
      <Tab.Screen
        name={routes.ON_BOOKING.route}
        component={OnbookingScreen}
        options={() => ({
          tabBarLabel: ({ color }) => (
            <AppText
              style={tw.style(` text-sm font-medium text-center`, {
                color,
              })}>
              {routes.ON_BOOKING.label}
            </AppText>
          ),
        })}
      />
      <Tab.Screen
        name={routes.MAINTENANCE.route}
        component={ManitenanceNavigator}
        options={() => ({
          tabBarLabel: ({ color }) => (
            <AppText
              style={tw.style(` text-sm font-medium text-center`, {
                color,
              })}>
              {routes.MAINTENANCE.label}
            </AppText>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default VehicleInventoryNavigator;
