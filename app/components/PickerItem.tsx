import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";

interface Item {
  label: string;
  value: string | number;
}

interface PickerItemProps {
  item: Item;
  label: string;
  onPress(): void;
}

const PickerItem: React.FC<PickerItemProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <AppText style={styles.text}>{item.label}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: { padding: 20 },
});

export default PickerItem;
