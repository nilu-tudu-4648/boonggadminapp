import React, { useState } from "react";

import {
  Button,
  FlatList,
  GestureResponderEvent,
  Modal,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import AppText from "./AppText";
import Screen from "./Screen";
import PickerItem from "./PickerItem";
import tw from "@/lib/tailwind";

interface Item {
  label: string;
  value: string | number;
}

interface PickerItemComponentProps {
  item: Item;
  onPress(event: GestureResponderEvent): void;
}

interface AppPickerProps {
  icon: keyof typeof Ionicons.glyphMap;
  numberOfColumns: number;
  items: Array<Item>;
  onSelectItem(item: Item): void;
  selectedItem?: Item;
  //the type of picker item component should be react fc
  PickerItemComponent: React.FC<PickerItemComponentProps>;
  // placeholder:string;
  width?: string | number;
}

const AppPicker: React.FC<AppPickerProps> = ({
  icon,
  items,
  numberOfColumns = 1,
  onSelectItem,
  selectedItem,
  PickerItemComponent = PickerItem,
  // placeholder,
  width = "100%",
  ...otherProps
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[]}>
          {icon && (
            <Ionicons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen style={[tw`bg-zinc-200 relative`]}>
          <View style={[tw` my-4 flex-row items-center`]}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={tw``}>
                <Ionicons name="ios-close" size={34} style={[]} />
              </View>
            </TouchableWithoutFeedback>
            <AppText style={[tw`text-center`]}>Menu</AppText>
          </View>
          {/* <Button title="Close" onPress={() => setModalVisible(false)}></Button> */}
          {/*FIXME: This is a hack for fixing the space below list*/}
          <View>
            <FlatList
              numColumns={numberOfColumns}
              data={items}
              style={[tw`p-4 overflow-visible`]}
              scrollEnabled={false}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <PickerItemComponent
                  item={item}
                  label={item.label}
                  onPress={() => {
                    setModalVisible(false);
                    onSelectItem(item);
                  }}
                />
              )}
            />
          </View>
          <View style={tw`border-b border-red-200 w-full`} />
          <View>
            <FlatList
              numColumns={numberOfColumns}
              data={items}
              scrollEnabled={false}
              style={tw`p-4 overflow-visible`}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <PickerItemComponent
                  item={item}
                  label={item.label}
                  onPress={() => {
                    setModalVisible(false);
                    onSelectItem(item);
                  }}
                />
              )}
            />
          </View>
        </Screen>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    // width: "100%",
    flexDirection: "row",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
  },
  icon: { marginRight: 10 },
  list: { flex: 1 },
  placeholder: { color: defaultStyles.colors.medium, flex: 1 },
  text: { flex: 1 },
  //   textInput: {
  //     fontSize: 18,
  //     fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  //     color: defaultStyles.colors.dark,
  //   },
});

export default AppPicker;
