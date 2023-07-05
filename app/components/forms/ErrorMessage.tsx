import tw from "@/lib/tailwind";
import React from "react";
import { StyleSheet } from "react-native";

import AppText from "../AppText";

function ErrorMessage({
  error,
  visible,
}: {
  error: string | undefined;
  visible: boolean | undefined;
}) {
  if (!visible || !error) {
    return null;
  }

  return <AppText style={tw`text-red-600 text-sm`}>{error}</AppText>;
}

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});

export default ErrorMessage;
