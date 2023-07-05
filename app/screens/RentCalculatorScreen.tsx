import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Constants from "expo-constants";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";

import AppText from "@/components/AppText";
import PaperBase from "@/components/PaperBase";
import RentCalculatorCard from "@/components/RentCalculatorCard";
import Screen from "@/components/Screen";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import tw from "@/lib/tailwind";
import { loadSearchedBikes } from "@/store/searchBikes";
import { AndroidMode, IOSMode } from "@/types/DateTimeTypes";
import { format, getUnixTime } from "date-fns";

interface RentCalculatorScreenProps { }

const RentCalculatorScreen: React.FC<RentCalculatorScreenProps> = (props) => {
  const [showStartDate, setShowStartDate] = useState<boolean>(false);
  const [showEndDate, setShowEndDate] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [mode, setMode] = React.useState<AndroidMode | IOSMode>("date");

  const dispatch = useAppDispatch();
  const { availableBikes } = useAppSelector((state) => state.entities.searchBikes);

  const showMode = (currentMode: AndroidMode | IOSMode) => {
    if (Constants.platform?.android) {
      // setShowDate(false);
      //FIXME: for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showStartDatePicker = () => {
    showMode("date");
    setShowStartDate(true);
  };

  const showEndDatePicker = () => {
    setShowEndDate(true);
  };

  const handleOnChangeStartDate = (
    e: DateTimePickerEvent,
    selectedDate: Date | undefined
  ): void => {
    const currentDate = selectedDate;
    console.log(selectedDate);
    setShowStartDate(false);
    setStartDate(currentDate);
  };

  const handleOnChangeEndDate = (
    e: DateTimePickerEvent,
    selectedDate: Date | undefined
  ): void => {
    const currentDate = selectedDate;
    console.log(getUnixTime(selectedDate as Date));
    setShowEndDate(false);
    setEndDate(currentDate);
  };

  return (
    <Screen style={tw`p-2`}>
      <PaperBase style={tw`mb-2.5`}>
        <View style={tw``}>
          <TouchableOpacity onPress={showStartDatePicker} style={tw``}>
            <View style={tw`flex-row items-center p-2`}>
              <MaterialIcons
                name="date-range"
                size={24}
                color={tw.color("bg-violet-700")}
                style={tw`mr-2`}
              />
              <AppText style={tw`text-sm font-semibold text-gray-600`}>
                {format(startDate as Date, "dd-MM-yyyy")}
              </AppText>
            </View>
          </TouchableOpacity>
          {showStartDate && (
            <DateTimePicker
              value={startDate as Date}
              mode={"date"}
              onChange={handleOnChangeStartDate}
            />
          )}
          <Divider />
          <TouchableOpacity onPress={showEndDatePicker} style={tw``}>
            <View style={tw`flex-row items-center p-2`}>
              <MaterialIcons
                name="date-range"
                size={24}
                color={tw.color("bg-violet-700")}
                style={tw`mr-2`}
              />
              <AppText style={tw`text-sm font-semibold text-gray-600`}>
                {format(endDate as Date, "dd-MM-yyyy")}
              </AppText>
            </View>
          </TouchableOpacity>
          {showEndDate && (
            <DateTimePicker
              value={endDate as Date}
              mode={"date"}
              onChange={handleOnChangeEndDate}
            />
          )}
        </View>
        <View style={tw`bg-violet-800 rounded-b-lg p-3`}>
          <TouchableOpacity
            onPress={() =>
              dispatch(
                loadSearchedBikes(
                  getUnixTime(startDate as Date),
                  getUnixTime(endDate as Date)
                )
              )
            }>
            <AppText style={tw`text-neutral-200 text-center text-sm`}>
              SEARCH BIKES
            </AppText>
          </TouchableOpacity>
        </View>
      </PaperBase>
      <PaperBase style={tw`p-2 h-4/5`}>
        <View style={tw`items-center mb-4 mt-2`}>
          <AppText style={tw`text-gray-500 font-semibold`}>
            Select Vehicle
          </AppText>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`p-1`}>
          {availableBikes.map((item, index) => (
            <RentCalculatorCard key={index} />
          ))}
        </ScrollView>
      </PaperBase>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default RentCalculatorScreen;
