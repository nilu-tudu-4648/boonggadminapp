import { useAppDispatch } from "@/hooks/useAppDispatch";
import tw from "@/lib/tailwind";
import { completeBookingRequest } from "@/store/ongoingBooking";
import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import { Dialog, Portal, TextInput } from "react-native-paper";
import AppText from "./AppText";
import _ from "lodash";
import StyleButton from "./StyleButton";
import colors from "../config/colors";

interface RentBookingRequestCompleteDialogProps {
  visible: boolean;
  selectedBikeforModify: object | undefined | any;
  //FIXME: check the function signature for this key
  hideDialog: Dispatch<SetStateAction<string>>;
}

const RentBookingRequestCompleteDialog: React.FC<RentBookingRequestCompleteDialogProps> = ({
  visible,
  hideDialog,
  selectedBikeforModify
}) => {
  const [endKm, setendKm] = React.useState<any>('0');
  const [rtoChallen, setrtoChallen] = React.useState("");
  const [fineAccidentalCost, setfineAccidentalCost] = React.useState("");
  const totalKmRun = endKm - _.get(selectedBikeforModify, "startKm")
  const dispatch = useAppDispatch()
  const enable = Boolean(endKm && rtoChallen && fineAccidentalCost)
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => hideDialog('')} style={tw`p-2 bg-white`}>
        <AppText style={[tw`m-3 font-bold `, { color: colors.purple, fontSize: 15 }]}>{`Drop Bike Details`}</AppText>
        <Dialog.Content style={tw`p-2`}>
          <View style={tw`p-1  rounded`}>
            <View style={tw`flex-row justify-between mb-2  w-full`}>
              <View style={tw`w-[48%]`}>
                <TextInput
                  label={<AppText style={tw`text-xs`}>Start Km</AppText>}
                  value={`${_.get(selectedBikeforModify, "startKm")}`}
                  style={tw`text-xs bg-white h-11`}
                  dense
                  editable={false}
                />
              </View>
              <View style={tw`w-[48%]`}>
                <TextInput
                  label={<AppText style={tw`text-xs`}>Handover End Km</AppText>}
                  value={endKm}
                  onChangeText={(text) => setendKm(text)}
                  style={tw`text-xs bg-white h-11`}
                  dense
                  keyboardType="number-pad"
                />
              </View>
            </View>
            <View style={tw`flex-row justify-between mb-2`}>
              <View style={tw`w-[49%]`}>
                <TextInput
                  label={<AppText style={tw`text-xs`}>Total Km Run</AppText>}
                  value={`${endKm !== '0' ? totalKmRun : 0}`}
                  style={tw`text-xs bg-white h-11`}
                  dense
                  editable={false}
                />
              </View>
              <View style={tw`w-[49%]`}>
                <TextInput
                  label={<AppText style={tw`text-xs`}>Helmate Provide</AppText>}
                  value={'Collect from user'}
                  style={tw`text-xs bg-white h-11`}
                  dense
                  editable={false}
                />
              </View>
            </View>
            <View style={tw`flex-row justify-between mb-2`}>
              <View style={tw`w-[49%]`}>
                <TextInput
                  label={<AppText style={tw`text-xs`}>RTO Challan</AppText>}
                  value={rtoChallen}
                  onChangeText={(text) => setrtoChallen(text)}
                  style={tw`text-xs bg-white h-11`}
                  dense
                />
              </View>
              <View style={tw`w-[49%]`}>
                <TextInput
                  label={<AppText style={tw`text-xs`}>Fine Accidental Cost</AppText>}
                  value={fineAccidentalCost}
                  onChangeText={(text) => setfineAccidentalCost(text)}
                  style={tw`text-xs bg-white h-11`}
                  dense
                />
              </View>
            </View>
          </View>
        </Dialog.Content>
        <StyleButton disabled={!enable} title="Drop Booking" borderColor={enable ? "green" : 'red'} textStyle={{ fontSize: 11 }} style={{ width: '35%', margin: 10, height: 35, alignSelf: 'flex-end' }} onPress={() => {
          hideDialog('')
          dispatch(completeBookingRequest({
            endKm,
            rtoChallen,
            fineAccidentalCost,
            totalKmRun,
            bikeBookedId: _.get(selectedBikeforModify, "_id"),
            _rentPoolKey: _.get(selectedBikeforModify, "_rentPoolKey._id")
          }))
        }} />
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(RentBookingRequestCompleteDialog);
