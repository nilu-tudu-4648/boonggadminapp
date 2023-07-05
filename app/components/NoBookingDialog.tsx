import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import tw from "@/lib/tailwind";

import { MaterialIcons } from "@expo/vector-icons";
import { modifyBookingRequest } from "@/store/ongoingBooking";
import { Picker as SelectPicker } from "@react-native-picker/picker";
import React, { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import AppText from "./AppText";
import _ from "lodash";
import colors from "../config/colors";
import StyleButton from "./StyleButton";
import moment from "moment";

interface NoBookingDialogProps {
    visible: boolean;
    selectedBikeforModify?: object | undefined;
    //FIXME: check the function signature for this key
    hideDialog: Dispatch<SetStateAction<string>>;
}

const NoBookingDialog: React.FC<NoBookingDialogProps> = ({
    visible,
    hideDialog,
    selectedBikeforModify
}) => {
    const [startDate, setstartDate] = useState<Date | undefined | number>(new Date().setMonth(new Date().getMonth() - 1));
    const [endDate, setendDate] = useState<number | string | undefined>(Date.parse(new Date()));
    // const { rentpoolList } = useAppSelector((state) => ({
    //     rentpoolList: state.entities.createBooking.rentpoolList,
    // }));
    const dispatch = useAppDispatch()
    const [selectVehicle, setSelectedVehicle] = useState('');
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={() => hideDialog('')} style={tw``}>
                <AppText style={[tw`m-3 font-bold `, { color: colors.purple, fontSize: 15 }]}>{`No Booking Form`}</AppText>
                <View
                    style={[
                        tw`flex-row justify-between items-center my-1 p-2.2 `
                    ]}>
                    <View style={tw`w-2.4/5`}>
                        <AppText style={[tw`font-semibold `, { fontSize: 12.5, color: colors.purple }]}>
                            Start Date
                        </AppText>
                        <TouchableOpacity onPress={() => {
                            showDatePicker()
                            setselectedDate("startDate")
                        }} style={[tw`p-2 w-full rounded-md flex-row items-center justify-between`, { backgroundColor: '#FFF0F0' }]}>
                            <AppText style={tw`text-xs font-semibold text-gray-600`}>
                                {moment(startDate).format('l')}
                            </AppText>
                            <MaterialIcons
                                name="date-range"
                                size={24}
                                color={colors.purple}
                                style={tw`mr-1`}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={tw`w-2.4/5`}>
                        <AppText style={[tw`font-semibold `, { fontSize: 12.5, color: colors.purple }]}>
                            End Date
                        </AppText>
                        <TouchableOpacity onPress={() => {
                            showDatePicker()
                            setselectedDate("endDate")
                        }} style={[tw`p-2 w-full rounded-md flex-row items-center justify-between`, { backgroundColor: '#FFF0F0' }]}>
                            <AppText style={tw`text-xs font-semibold text-gray-600`}>
                                {moment(endDate).format('l')}
                            </AppText>
                            <MaterialIcons
                                name="date-range"
                                size={24}
                                color={colors.purple}
                                style={tw`mr-1`}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Dialog.Content style={tw`p-2.2`}>
                    <View style={tw`w-full self-center bg-gray-200 py-3 p-1 rounded flex-row justify-between items-center`}>
                        <AppText style={tw`text-gray-500 text-sm`}>Select Vehicle</AppText>
                        <View style={tw`w-1/2`}>
                            <SelectPicker
                                style={tw`w-full `}
                                selectedValue={selectVehicle}
                                // mode="dropdown"
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedVehicle(itemValue)
                                }>
                                {/* {
                  rentpoolList.map((ite, i) => {
                    return (
                      <SelectPicker.Item key={i} style={tw`font-bold text-sm text-gray-500`} label={ite.registrationNumber + " " + ite.brand + " " + ite.vehicleModel} value={ite} />
                    )
                  })
                } */}
                                <SelectPicker.Item style={tw`font-bold text-sm text-gray-500`} label={"ite.registrationNumber  ite.vehicleModel"} value={"ite"} />
                            </SelectPicker>
                        </View>
                    </View>
                </Dialog.Content>
                <StyleButton title="Modify Vehicle" borderColor={colors.green} textStyle={{ fontSize: 11 }} style={{ width: '35%', margin: 10, height: 35, alignSelf: 'flex-end' }} onPress={() => {
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

export default NoBookingDialog;
