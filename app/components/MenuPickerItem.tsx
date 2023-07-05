import tw from "@/lib/tailwind";
import React from "react";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import AppText from "./AppText";
import Icon from "./Icon";
import { Ionicons } from "@expo/vector-icons";

interface Item {
  label: string;
  value: string | number;
}

interface MenuPickerItemProps {
  item: Item;
  onPress(event: GestureResponderEvent): void;
}

const MenuPickerItem: React.FC<MenuPickerItemProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={tw.style(`flex-col items-center p-3`, {
        flex: 2,
        "border-r": index < row.length - 1,
      })}
      onPress={() => handleOnClick(col.type)}
      key={index}>
      <View style={tw`items-center`}>
        <View style={tw``}>
          <Image source={col.image} style={tw`h-16 w-16`} />
        </View>
        <AppText style={tw`text-center text-xs mt-2`}>{col.label}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    width: "33%",
  },
  logo: {},
  label: { marginTop: 5, textAlign: "center" },
});

export default MenuPickerItem;
