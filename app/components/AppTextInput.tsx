import React, { useState } from "react";

import tw from "@/lib/tailwind";
import { Platform, StyleProp, StyleSheet, TextInput, View, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";

interface TextInputProps {
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  width?: number;
  onChangeText(text: string): void;
  onBlur(): void;
  value: string | undefined;
  isPassword?: boolean;
  style?: StyleProp<ViewStyle>
}

//FIXME: how to declare typeof spread props
const AppTextInput: React.FC<TextInputProps> = ({
  icon,
  width,
  style,
  isPassword,
  ...otherProps
}) => {
  const [hidePassword, sethidePassword] = useState<boolean>(true)
  return (
    <View style={!style ? [styles.container, { width, }, style] : [tw`flex-row h-11 p-1 my-4`, { fontSize: 17, borderBottomColor: 'black', borderBottomWidth: 1 }]}>
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, { width: '90%', color: style ? 'black' : 'white' }]}
        {...otherProps}
        secureTextEntry={hidePassword && isPassword ? true : false}
      />
      {isPassword && (
        <MaterialCommunityIcons
          name={hidePassword ? icon : 'eye-off'}
          size={27}
          onPress={() => sethidePassword(!hidePassword)}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    width: "100%",
    flexDirection: "row",
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
  },
  icon: { width: '10%', marginRight: 10 },
  textInput: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: defaultStyles.colors.dark,
  },
});

export default AppTextInput;
