import tw from "@/lib/tailwind";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface PaperBaseProps {
  children?: JSX.Element | JSX.Element[] | React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const PaperBase: React.FC<PaperBaseProps> = ({ children, style }) => {
  return (
    <View style={[tw`shadow-md bg-neutral-50 w-full rounded-lg`, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PaperBase;
