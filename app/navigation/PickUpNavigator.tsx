import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "@/components/AppText";
import tw from "@/lib/tailwind";
import TodaysPickupScreen from "@/screens/TodaysPickupScreen";
import routes from "./routes";
import FuturePickupScreen from "@/screens/FuturePickupScreen";
import OverDuePickUpScreen from '@/screens/OverDuePickupScreen'
import { i18n } from "../../language";

interface PickUpNavigatorProps { }

const Tab = createMaterialTopTabNavigator();

const PickUpNavigator: React.FC<PickUpNavigatorProps> = (props) => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarStyle: tw`bg-violet-800`,
        tabBarLabelStyle: tw`text-neutral-200`,
        tabBarIndicatorStyle: tw`bg-neutral-200`,
        tabBarActiveTintColor: tw.color(`text-neutral-200`),
      })}>
      <Tab.Screen
        name={routes.TODAYS_PICKUP.route}
        options={() => ({
          tabBarLabel: ({ color }) => (
            <View>
              <AppText style={tw.style(`text-xs font-medium text-center`, { color, })}>{i18n.t("Today's")}</AppText>
              <AppText style={tw.style(`text-sm font-medium text-center`, { color, })}>{i18n.t("Pickup")}</AppText>
            </View>
          ),
        })}
        component={TodaysPickupScreen}
      />
      <Tab.Screen
        name={routes.FUTURE_PICKUP.route}
        options={() => ({
          tabBarLabel: ({ color }) => (
             <View>
              <AppText style={tw.style(`text-xs font-medium text-center`, { color, })}>{i18n.t("Future")}</AppText>
              <AppText style={tw.style(`text-sm font-medium text-center`, { color, })}>{i18n.t("Pickup")}</AppText>
            </View>
          ),
        })}
        component={FuturePickupScreen}
      />
      <Tab.Screen
        name={routes.OVERDUE_PICKUP.route}
        options={() => ({
          tabBarLabel: ({ color }) => (
            <View>
              <AppText style={tw.style(`text-xs font-medium text-center`, { color, })}>{i18n.t("Overdue")}</AppText>
              <AppText style={tw.style(`text-sm font-medium text-center`, { color, })}>{i18n.t("Pickup")}</AppText>
            </View>
          ),
        })}
        component={OverDuePickUpScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PickUpNavigator;
