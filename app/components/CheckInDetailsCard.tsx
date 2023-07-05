import React, { useMemo, useState } from "react";
import { GestureResponderEvent, Image, Linking, StyleSheet, TouchableOpacity, View } from "react-native";

import AppText from "@/components/AppText";
import PaperBase from "@/components/PaperBase";
import tw from "@/lib/tailwind";
import { FontAwesome } from '@expo/vector-icons';
import _ from "lodash";
import { useDispatch } from "react-redux";
import { fetchBikestotransferBookings } from '@/store/pickUpStore';
import colors from "../config/colors";
import moment from "moment";
import StyleButton from "./StyleButton";

interface CheckInDetailsCardProps {
  checkInFunc: React.Dispatch<React.SetStateAction<object>>
  item: { [key: string]: object | string | number | null | any };
  email: string;
  startDate: string;
  endDate: string;
  storeDetail: object;
  userName: string;
  mobileNumber: string;
  boonggBookingId: string;
  bookingType: string;
  city: any;
  setvisibleDialog: React.Dispatch<React.SetStateAction<string>>;
  setBookingforCheckIn: React.Dispatch<React.SetStateAction<object>>;
}

const CheckInDetailsCard: React.FC<CheckInDetailsCardProps> = ({
  item,
  email,
  mobileNumber,
  startDate,
  endDate,
  boonggBookingId,
  bookingType,
  userName,
  storeDetail,
  setBookingforCheckIn,
  setvisibleDialog,
  checkInFunc,
  city
}) => {
  const [registration, setregistration] = useState(false)
  useMemo(() => {
    const result = _.get(item, '_rentPoolKey.registrationNumber')
    setregistration(result)
  }, [storeDetail])
  const dispatch = useDispatch()
  return (
    <PaperBase style={[tw.style(`mb-2 w-9.4/10 self-center rounded-md`), { backgroundColor: _.get(item, "_webuserId.blockUser") ? '#FFC4C4' : 'white' }]}>
      <View style={[tw`px-2 p-1`, { backgroundColor: "#F7F7F7" }]}>
        <View style={[tw`flex-row justify-between items-center`]}>
          <AppText style={[tw`font-semibold`, { fontSize: 10.5 }]}>{userName}</AppText>
          <AppText style={[tw``, { color: colors.green, fontSize: 10 }]}>{bookingType?.toLowerCase()}</AppText>
        </View>
        <View style={[tw`flex-row justify-between items-center`]}>
          <AppText style={[tw`font-bold`, { fontSize: 11.5 }]}>{item.brand} {item.model}
            {registration && ` (${_.get(item, '_rentPoolKey.registrationNumber')})`}</AppText>
          <AppText style={[tw``, { color: colors.gray, fontSize: 9 }]}>{email}</AppText>
        </View>
        <View style={[tw`flex-row justify-between items-center`]}>
          <AppText style={[tw``, { fontSize: 9, color: colors.gray }]}>{boonggBookingId}</AppText>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${mobileNumber}`)} style={[tw`flex-row items-center`]}>
            <FontAwesome name="phone" size={11} color={colors.purple} />
            <AppText style={[tw`ml-1`, { color: colors.purple, fontSize: 9 }]}>{mobileNumber}</AppText>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[tw`p-2`]}>
        <View style={tw`flex-row items-center`}>
          <View style={[tw`flex-row justify-between items-center w-2/3`]}>
            <AppText style={[tw`text-xs w-1/3`, { ...styles.halfstyle, color: colors.gray }]}>From</AppText>
            <View style={tw`w-1/3 right-3`}>
              <Image resizeMode="contain" source={require("../assets/arrow.jpg")} style={[tw`h-6  w-8`]} />
            </View>
            <AppText style={[tw`text-xs w-1/3`, { ...styles.halfstyle, color: colors.gray }]}>To</AppText>
          </View>
          <View style={[tw`flex-row justify-between items-center w-1/3 ml-5`]}>
            {
              item.isLongTerm ?
                <AppText style={[tw``, { color: colors.purple, fontSize: 9 }]}>Long Term Booking</AppText> :
                <AppText style={[tw``, { color: colors.lightblue, fontSize: 9 }]}>Short Term Booking</AppText>
            }
          </View>
        </View>
        <View style={[tw`flex-row justify-between`]}>
          <AppText style={[tw`font-bold`, { fontSize: 10 }]}>{moment(startDate).format('lll')}</AppText>
          <AppText style={[tw`font-bold`, { fontSize: 10 }]}>{moment(endDate).format('lll')}</AppText>
          <AppText style={[tw`font-bold bottom-1`, { color: colors.green }]}>{item.totalAmountRecived || 0}/-</AppText>
        </View>
      </View>
      <View style={[tw`rounded-md flex-row justify-end items-center m-2`,]}>
        <StyleButton borderColor={'#B2212D'} title={"Cancel"} onPress={() => {
          setBookingforCheckIn(item)
          setvisibleDialog("cancel")
        }} />
        <StyleButton borderColor={colors.purple} title="Remark" onPress={() => {
          setBookingforCheckIn(item)
          setvisibleDialog('UserRemark')
        }} />
        <StyleButton borderColor="#17A1FA" title="Transfer" onPress={() => {
          setBookingforCheckIn(item)
          dispatch(fetchBikestotransferBookings({
            startDate: Date.parse(item.startDate),
            endDate: Date.parse(item.endDate),
            Bikemodel: {
              brand: item.brand,
              modelName: item.model
            },
            city
          }))
          setvisibleDialog("transfer")
        }} />
        <StyleButton title="Check In" onPress={() => {
          checkInFunc(item)
          setBookingforCheckIn(item)
        }} />
      </View>
    </PaperBase>
  );
};

const styles = StyleSheet.create({
  halfstyle: {
    width: '50%'
  },
  bntstyle: {
    borderRadius: 4,
    width: '20%',
    justifyContent: 'center',
    height: 28,
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: 3
  }
});

export default React.memo(CheckInDetailsCard);
