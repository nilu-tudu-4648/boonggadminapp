import React from "react";
import Constants from "expo-constants";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";
// import tw from "@lib/tailwind";

const Screen = ({
  children,
  style,
}: {
  children: JSX.Element | JSX.Element[];
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
    // <View style={[styles.screen, style]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1,overflow:'hidden' },
  view: { flex: 1 },
});

export default Screen;
