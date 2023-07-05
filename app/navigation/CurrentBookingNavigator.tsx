import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import tw from "@/lib/tailwind";
import HistoryScreen from "@/screens/HistoryScreen";
import DropNavigator from "./DropNavigator";
import PickUpNavigator from "./PickUpNavigator";
import { i18n } from "../../language";

const Tab = createBottomTabNavigator();

interface CurrentBookingNavigatorProps { }

const CurrentBookingNavigator: React.FC<CurrentBookingNavigatorProps> = () => {
  return (
    <Tab.Navigator screenOptions={() => ({ headerShown: false })}>
      <Tab.Screen
        name={i18n.t("Pickup")}
        options={() => ({
          tabBarActiveTintColor: tw.color(`bg-violet-800`),
          tabBarLabelStyle: tw`text-xs`,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-location" size={size} color={color} />
          ),
        })}
        component={PickUpNavigator}
      />
      <Tab.Screen
        name={i18n.t("Drop")}
        component={DropNavigator}
        options={() => ({
          tabBarLabelStyle: tw`text-xs`,
          tabBarActiveTintColor: tw.color(`bg-violet-800`),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="location-on" size={size} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name={i18n.t("History")}
        component={HistoryScreen}
        options={() => ({
          tabBarLabelStyle: tw`text-xs`,
          tabBarActiveTintColor: tw.color(`bg-violet-800`),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="history" size={size} color={color} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default CurrentBookingNavigator;
