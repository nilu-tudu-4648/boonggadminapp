import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";
import colors from "../config/colors";
import tw from "@/lib/tailwind";

interface AppButtonProps {
  title: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  color?: string;
  disabled?: boolean
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  color = 'purple',
  disabled
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        tw`rounded-1.3 my-2 p-3.5 w-full items-center justify-center `,
        { backgroundColor: disabled ? 'lightgray' : colors[color] }, style,
      ]}
      onPress={onPress}>
      <Text style={[tw`font-bold text-neutral-100`, tw``, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
  },
});

export default React.memo(AppButton);
