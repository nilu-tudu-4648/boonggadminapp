import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

interface IconProps {
  name: keyof typeof Ionicons.glyphMap;
  backgroundColor?: string;
  iconColor?: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 40,
  backgroundColor = "#000000",
  iconColor = "#ffffff",
}) => {
  return (
    <View
      style={{
        backgroundColor,
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Ionicons name={name} size={size * 0.5} color={iconColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {},
});

export default Icon;
