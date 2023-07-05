import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import tw from "@/lib/tailwind";
import { modifyBookingRequest } from "@/store/ongoingBooking";
import { Picker as SelectPicker } from "@react-native-picker/picker";
import React, { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import AppText from "./AppText";
import _ from "lodash";
import colors from "../config/colors";
import StyleButton from "./StyleButton";

interface ModifiedVehicleDialogProps {
  visible: boolean;
  selectedBikeforModify: object | undefined;
  //FIXME: check the function signature for this key
  hideDialog: Dispatch<SetStateAction<string>>;
}

const ModifiedVehicleDialog: React.FC<ModifiedVehicleDialogProps> = ({
  visible,
  hideDialog,
  selectedBikeforModify
}) => {
  const { rentpoolList } = useAppSelector((state) => state.entities.createBooking);
  const dispatch = useAppDispatch()
  const [selectVehicle, setSelectedVehicle] = useState('');
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => hideDialog('')} style={tw`p-2 bg-white pb-5`}>
        <AppText style={[tw`m-3 font-bold `, { color: colors.purple, fontSize: 15 }]}>{`Modify Vehicle`}</AppText>
        <Dialog.Content style={tw`p-2`}>
          <AppText style={[tw`font-semibold text-gray-500`, { bottom: 5, fontSize: 14 }]}>
            Select Vehicle
          </AppText>
          <SelectPicker
            style={tw`w-full self-center bg-gray-200 rounded h-8`}
            selectedValue={selectVehicle}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedVehicle(itemValue)
            }>
            {
              rentpoolList.map((ite, i) => (
                <SelectPicker.Item
                  key={i}
                  label={ite.registrationNumber + " " + ite.brand + " " + ite.vehicleModel}
                  value={ite}
                  style={tw`text-xs`}
                />
              ))
            }
          </SelectPicker>
        </Dialog.Content>
        <StyleButton title="Modify Vehicle" borderColor="#17A1FA" textStyle={{ fontSize: 11 }} style={{ width: '35%', top: 12, margin: 10, height: 35, alignSelf: 'flex-end' }} onPress={() => {
          dispatch(modifyBookingRequest({
            bookingId: _.get(selectedBikeforModify, "_id"),
            storeKey: _.get(selectedBikeforModify, "_rentBikeKey._storeKey"),
            newBikePoolKey: _.get(selectVehicle, "id"),
            previousBikePoolKey: _.get(selectedBikeforModify, " _rentPoolKey._id"),
            brand: _.get(selectVehicle, "brand"),
            model: _.get(selectVehicle, "vehicleModel"),
          }))
          hideDialog('')
        }} />
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(ModifiedVehicleDialog);
