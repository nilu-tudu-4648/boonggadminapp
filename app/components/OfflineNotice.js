import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";

import colors from "../config/colors";
import AppText from "./AppText";

const OfflineNotice = (props) => {
  const netInfo = useNetInfo();

  if (netInfo.type !== "unkown" && netInfo.isInternetReachable === false) {
    return (
      <View style={styles.container}>
        <AppText>No Internet Connection</AppText>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.primary,
    height: 50,
    position: "absolute",
    top: Constants.statusBarHeight,
    width: "100%",
    justifyContent: "center",
    zIndex: 1,
  },
});

export default OfflineNotice;
