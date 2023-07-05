import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React from "react";
import { StyleSheet } from "react-native";

type AndroidMode = "date" | "time";
type IOSMode = "date" | "time" | "datetime" | "countdown";

interface AppDateTimePickerProps {
  handleOnChange: (
    e: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => void;
  mode: AndroidMode | IOSMode;
}

const AppDateTimePicker: React.FC<AppDateTimePickerProps> = ({
  handleOnChange,
  mode,
  date,
}) => {
  return (
    <DateTimePicker
      value={date as Date}
      mode={mode}
      onChange={handleOnChange}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AppDateTimePicker;
