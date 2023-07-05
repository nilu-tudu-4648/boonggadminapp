import React, { useMemo, useState } from "react";
import { GestureResponderEvent, Image, Linking, StyleSheet, ToastAndroid, TouchableOpacity, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import AppText from "@/components/AppText";
import PaperBase from "@/components/PaperBase";
import tw from "@/lib/tailwind";
import formatDate from "@/utils/formatDate";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { getrentpoolList } from "@/store/createBooking";
import StyleButton from "./StyleButton";
import colors from "../config/colors";
import moment from "moment";
import { useAppSelector } from "@/hooks/useAppSelector";

interface BookingDetailsDropDetailsCardProps {
  openSheet: ((event: GestureResponderEvent) => void) | undefined
  item: { [key: string]: object | string | number | null | any };
  email: string;
  startDate: string;
  endDate: string;
  userName: string;
  mobileNumber: string;
  boonggBookingId: string;
  bookingType: string;
  setvisibleDialog: React.Dispatch<React.SetStateAction<string>>;
  setBookingforCheckIn: React.Dispatch<React.SetStateAction<object>>;
  buttonsVisible?: boolean
}

const BookingDetailsDropDetailsCard: React.FC<BookingDetailsDropDetailsCardProps> = ({
  item,
  openSheet,
  email,
  mobileNumber,
  startDate,
  endDate,
  boonggBookingId,
  bookingType,
  userName,
  setBookingforCheckIn,
  setvisibleDialog,
  buttonsVisible
}) => {
  const { storeDetail } = useAppSelector((state: any) => state.entities.searchBikes);
  const [registration, setregistration] = useState(false)
  const dispatch = useDispatch()
  useMemo(() => {
    const result = _.get(item, '_rentPoolKey.registrationNumber')
    setregistration(result)
  }, [storeDetail])
  return (
    <PaperBase style={[tw.style(`mb-2 w-9.4/10 self-center rounded-md`), { backgroundColor: _.get(item, "_webuserId.blockUser") ? '#FFC4C4' : 'white' }]}>
      <View style={[tw`px-2 p-1`, { backgroundColor: "#F7F7F7" }]}>
        <View style={[tw`flex-row justify-between items-center`]}>
          <AppText style={[tw`font-semibold`, { fontSize: 10.5 }]}>{userName}</AppText>
          <AppText style={[tw``, { color: colors.green, fontSize: 10 }]}>{bookingType?.toLowerCase()}</AppText>
        </View>
        <View style={[tw`flex-row justify-between items-center`]}>
          <AppText style={[tw`font-bold`, { fontSize: 11 }]}>{item.brand} {item.model}</AppText>
          <AppText style={[tw``, { color: colors.gray, fontSize: 9, top: 10 }]}>{email}</AppText>
        </View>

        <AppText style={[tw`font-bold`, { fontSize: 11 }]}>{registration && `(${_.get(item, '_rentPoolKey.registrationNumber')})`}</AppText>
        <View style={[tw`flex-row justify-between items-center`]}>
          <AppText style={[tw``, { fontSize: 9, color: colors.gray }]}>{boonggBookingId}</AppText>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${mobileNumber}`)} style={[tw`flex-row items-center`]}>
            <FontAwesome name="phone" size={11} color={colors.purple} />
            <AppText style={[tw`ml-1`, { color: colors.purple, fontSize: 9 }]}>{mobileNumber}</AppText>
          </TouchableOpacity>
        </View>
      </View>
      {
        buttonsVisible &&
        <AppText style={[tw`text-red-400 text-right text-sm my-1`, { fontSize: 11, right: 8 }]}>
          Cancelled On {formatDate(_.get(item, "cancellation.date"))}
        </AppText>
      }
      <View style={[tw`p-1 `]}>
        <View style={[tw`flex-row justify-between items-center w-2/3`]}>
          <AppText style={[tw`text-xs w-1/3`, { ...styles.halfstyle, color: colors.gray }]}>From</AppText>
          <View style={tw`w-1/3 right-3`}>
            <Image resizeMode="contain" source={require("../assets/arrow.jpg")} style={[tw`h-6  w-8`]} />
          </View>
          <AppText style={[tw`text-xs w-1/3`, { ...styles.halfstyle, color: colors.gray }]}>To</AppText>
        </View>
        <View style={[tw`flex-row justify-between`]}>
          <AppText style={[tw`font-bold`, { fontSize: 10 }]}>{moment(startDate).format('lll')}</AppText>
          <AppText style={[tw`font-bold`, { fontSize: 10 }]}>{moment(endDate).format('lll')}</AppText>
          <AppText style={[tw`font-bold bottom-1`, { color: 'green' }]}>{item.totalAmountRecived || 0}/-</AppText>
        </View>
      </View>
      {
        !buttonsVisible &&
        <View style={[tw`rounded-md flex-row justify-end items-center m-2`,]}>
          <StyleButton title="Drop Booking" borderColor="#B2212D" onPress={() => {
            setvisibleDialog('RentBookingRequestCompleteDialog')
            setBookingforCheckIn(item)
          }} />
          <StyleButton title="Modify Vehicle" borderColor="#17A1FA" onPress={() => {
            dispatch(getrentpoolList(`${_.get(storeDetail, "user._store")}`))
            setvisibleDialog("modifyVehicle")
            setBookingforCheckIn(item)
          }} />
          <StyleButton title="Details" borderColor="purple" onPress={() => {
            setBookingforCheckIn(item)
            openSheet()
          }} />
        </View>
      }
    </PaperBase>
  );
};

const styles = StyleSheet.create({
  halfstyle: {
    width: '50%'
  },
  bntstyle: {
    borderRadius: 6,
    width: '23%',
    justifyContent: 'center',
    height: 31,
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: 3
  }
});

export default BookingDetailsDropDetailsCard;
