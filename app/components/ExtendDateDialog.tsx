import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Constants from "expo-constants";
import React, { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

import tw from "@/lib/tailwind";
import AppText from "./AppText";

interface ExtendDateDialogProps {
  visible: boolean;
  //FIXME: check the function signature for this key
  hideDialog: Dispatch<SetStateAction<string>>
}

type AndroidMode = "date" | "time";
type IOSMode = "date" | "time" | "datetime" | "countdown";

const ExtendDateDialog: React.FC<ExtendDateDialogProps> = ({
  visible,
  hideDialog,
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [mode, setMode] = useState<AndroidMode | IOSMode>("date");
  const [showDate, setShowDate] = useState<boolean>(false);

  const showMode = (currentMode: AndroidMode | IOSMode) => {
    if (Constants.platform?.android) {
      // setShowDate(false);
      //FIXME: for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const handleOnChange = (
    e: DateTimePickerEvent,
    selectedDate: Date | undefined
  ): void => {
    const currentDate = selectedDate;
    console.log(selectedDate);
    setShowDate(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    showMode("date");
    setShowDate(true);
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => hideDialog('')}>
        <View
          style={tw`bg-violet-800 m-0 mb-2 text-center items-center p-3 rounded-t-[0.225rem]`}>
          <AppText style={tw`text-base font-bold text-neutral-200 uppercase`}>
            Extend Date
          </AppText>
        </View>
        <Dialog.Content style={tw``}>
          <TouchableOpacity onPress={showDatepicker} style={tw`mb-3`}>
            <View style={tw`bg-gray-200 flex-row items-center p-2`}>
              <MaterialIcons
                name="date-range"
                size={24}
                color={tw.color("bg-violet-700")}
                style={tw`mr-2`}
              />
              <AppText style={tw`text-sm font-semibold text-gray-600`}>
                Extension Date
              </AppText>
            </View>
          </TouchableOpacity>
          {showDate && (
            <DateTimePicker
              value={date as Date}
              mode={mode}
              onChange={handleOnChange}
            />
          )}
          <View style={tw`mb-3`}>
            <Button style={tw`bg-violet-700`} compact>
              <AppText style={tw`text-neutral-50 text-sm capitalize`}>
                Calculate Rent
              </AppText>
            </Button>
          </View>
          <View style={tw`bg-gray-200 p-2`}>
            <AppText style={tw`text-sm text-gray-600 font-semibold`}>
              Calculated Rent is 3500
            </AppText>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => hideDialog('')}>
            <AppText style={tw`text-sm`}>Cancel</AppText>
          </Button>
          <Button onPress={() => hideDialog('')}>
            <AppText style={tw`text-sm`}>Extend Date</AppText>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ExtendDateDialog;
