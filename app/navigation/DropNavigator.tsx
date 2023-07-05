import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import routes from "./routes";
import TodaysDropScreen from "@/screens/TodaysDropScreen";
import tw from "@/lib/tailwind";
import AppText from "@/components/AppText";
import FutureDropScreen from "@/screens/FutureDropScreen";
import ExtendedDropScreen from "@/screens/ExtendedDropScreen";
import { View } from "react-native";
import { i18n } from "../../language";

const Tab = createMaterialTopTabNavigator();

interface DropNavigatorProps { }

const DropNavigator: React.FC<DropNavigatorProps> = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarStyle: tw`bg-violet-800`,
        tabBarLabelStyle: tw`text-neutral-400`,
        tabBarIndicatorStyle: tw`bg-neutral-200`,
        tabBarActiveTintColor: tw.color(`text-neutral-200`),
      })}>
      <Tab.Screen
        name={routes.TODAYSDROP.route}
        options={() => ({
          tabBarLabel: ({ color }) => (
            <View>
              <AppText style={tw.style(`text-xs font-medium text-center`, { color, })}>{i18n.t("Today's")}</AppText>
              <AppText style={tw.style(`text-sm font-medium text-center`, { color, })}>{i18n.t("Drop")}</AppText>
            </View>
          ),
        })}
        component={TodaysDropScreen}
      />
      <Tab.Screen
        name={routes.FUTUREDROP.route}
        options={() => ({
          tabBarLabel: ({ color }) => (
            <View>
              <AppText style={tw.style(`text-xs font-medium text-center`, { color, })}>{i18n.t("Future")}</AppText>
              <AppText style={tw.style(`text-sm font-medium text-center`, { color, })}>{i18n.t("Drop")}</AppText>
            </View>
          ),
        })}
        component={FutureDropScreen}
      />
      <Tab.Screen
        name={routes.EXTENDEDDROP.route}
        options={() => ({
          tabBarLabel: ({ color }) => (
            <View>
              <AppText style={tw.style(`text-xs font-medium text-center`, { color, })}>{i18n.t("Extended")}</AppText>
              <AppText style={tw.style(`text-sm font-medium text-center`, { color, })}>{i18n.t("Drop")}</AppText>
            </View>
          ),
        })}
        component={ExtendedDropScreen}
      />
    </Tab.Navigator>
  );
};

export default DropNavigator;
