import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import tw from "@/lib/tailwind";
import { Picker as SelectPicker } from "@react-native-picker/picker";
import _ from "lodash";
import { View, StyleSheet, TouchableOpacity, Image, FlatList, TextInput, BackHandler } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
import AppText from '@/components/AppText';
import AppButton from '@/components/AppButton';
import colors from '../config/colors';
import routes from '@/navigation/routes';
import CheckInDetailsCard from '@/components/CheckInDetailsCard';
import { useDispatch } from 'react-redux';
import CustomActivityIndicator from '@/components/CustomActivityIndicator';
import moment from 'moment';
import { Dialog, Portal } from 'react-native-paper';
import StyleButton from '@/components/StyleButton';
import TransferBookingDialog from '@/components/TransferBookingDialog';
import {
  getallPickups, cancelrequestRentBooking, fetchBikestotransferBookings,
  getrentbookinguserOngoing, getUserbyMobileNo as getuser, getrentpoolList
} from '@/store/pickUpStore';
import { createBookingPayDataReceived, getUserbyMobileNo, stepCountValuesaveToReducers, getrentpoolList as getrent } from "@/store/createBooking";
import { RootState } from '@/types/RootStateType';
import UserRemarkDialog from '@/components/UserRemarkDialog';
import ShowImageonPickup from '@/components/ShowImageonPickup';
import { i18n } from "../../language";
import { useAppSelector } from '@/hooks/useAppSelector';
import AppSearchBar from '@/components/AppSearchBar';
import { useNavigationState } from '@react-navigation/native';
interface TodaysPickupScreenProps {

}
const TodaysPickupScreen: React.FC<TodaysPickupScreenProps> = ({ navigation }: any) => {
  const { loading, todayspickUp, cancelrequestRentBookingData, transferRentbooking, webuserupdate,
    fetchBikestransferRentbooking }
    = useAppSelector((state: any) => state.entities.pickupStore);
  const { storeDetail, currentCity } = useAppSelector((state: RootState) => state.entities.searchBikes);
  const [bookingforCheckIn, setBookingforCheckIn] = useState<any>({})
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // variables
  const snapPoints = useMemo(() => ['80%', '90%'], []);
  // const snapPoints = useMemo(() => [400, 470], []);
  // callbacks
  const openSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const closeSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const dispatch = useDispatch()

  const [reasonofCancel, setreasonofCancel] = React.useState("Customer didn't show up");
  const [visibleDialog, setvisibleDialog] = useState<string>('')
  const [todaysPickuplocal, settodaysPickuplocal] = React.useState<any>(todayspickUp);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [amount, setamount] = React.useState('0');
  const [refreshing, setrefreshing] = useState(false)
  const [imageUrl, setimageUrl] = React.useState({});
  const toggleDialog = useCallback((str: any) => {
    if (str) return setvisibleDialog(str)
    setvisibleDialog('')
  }, [])
  const openImageDialog = (urls: object) => {
    setimageUrl(urls)
    toggleDialog("imagesdialog")
  }
  const apiCalls = useCallback(() => {
    dispatch(getallPickups(`${_.get(storeDetail, "user._store")}`))
  }, [storeDetail])
  const onRefresh = () => {
    setrefreshing(true)
    apiCalls()
    setrefreshing(false)
  }
  const onChangeSearch = useCallback((query: string) => {
    if (query) {
      settodaysPickuplocal(todayspickUp.filter(ite =>
        _.get(ite, "boonggBookingId", "").includes(query) ||
        _.get(ite, "_webuserId.profile.name", "").includes(query) ||
        _.get(ite, "_webuserId.profile.mobileNumber", "").includes(query)
      ))
    } else {
      settodaysPickuplocal(todayspickUp)
    }
    setSearchQuery(query)
  }, [searchQuery])
  const checkInFunc = useCallback((item: any) => {
    dispatch(stepCountValuesaveToReducers(2))
    dispatch(getrent(`${_.get(storeDetail, "user._store")}`))
    dispatch(getrentpoolList(`${_.get(storeDetail, "user._store")}`))
    dispatch(createBookingPayDataReceived(item))
    openSheet()
  }, [])
  const navigationState = useNavigationState(state => state);
  const activeRouteName = navigationState.routes[navigationState.index].name;
  const cancelButtonCalled = () => {
    toggleDialog('')
    dispatch(cancelrequestRentBooking({
      id: _.get(bookingforCheckIn, "_id"),
      data: {
        reason: reasonofCancel,
        cancelBy: "STORE_ADIMN",
        amount,
        bookingType: _.get(bookingforCheckIn, "bookingType")
      }
    }))
  }
  // renders
  const cancelTypes = [
    "Customer didn't show up",
    "Vehicle Issue",
    "Other",
  ];
  useEffect(() => {
    settodaysPickuplocal(todayspickUp)
  }, [todayspickUp])
  useEffect(() => {
    if (activeRouteName === 'TodaysPickup') {
      apiCalls()
    }
  }, [cancelrequestRentBookingData, transferRentbooking, webuserupdate])
  BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.goBack()
    return () => true
  }, [])
  return (
    <View style={[tw`bg-white`, { flex: 1 }]}>
      <CustomActivityIndicator visible={loading} />
      <TransferBookingDialog
        fetchBikestransferRentbooking={fetchBikestransferRentbooking}
        storeDetail={storeDetail}
        visible={visibleDialog === "transfer"}
        hideDialog={toggleDialog}
        bookingforCheckIn={bookingforCheckIn}
      />
      <UserRemarkDialog
        storeDetail={storeDetail}
        visible={visibleDialog === "UserRemark"}
        hideDialog={toggleDialog}
        bookingforCheckIn={bookingforCheckIn} />
      <ShowImageonPickup
        visible={visibleDialog === "imagesdialog"}
        hideDialog={toggleDialog}
        imageUrl={imageUrl}
      />
      <Portal>
        <Dialog style={tw`p-2 bg-white`} visible={visibleDialog === "cancel"} onDismiss={() => setvisibleDialog('')}>
          <AppText style={[tw`m-3 font-bold `, { color: colors.purple, fontSize: 16 }]}>{i18n.t("Cancel Booking")}</AppText>
          <Dialog.Content style={tw`p-2.2 my-2`}>
            <AppText style={[tw`font-semibold text-gray-500`, { bottom: 10, fontSize: 14 }]}>
              {i18n.t("Reason for cancellation?")}
            </AppText>
            <SelectPicker
              style={tw`w-full self-center bg-gray-200 rounded h-8`}
              selectedValue={reasonofCancel}
              onValueChange={(itemValue, itemIndex) =>
                setreasonofCancel(itemValue)
              }>
              {
                cancelTypes.map((ite, i) => (
                  <SelectPicker.Item
                    key={i}
                    label={ite}
                    value={ite}
                    style={tw`text-xs`}
                  />
                ))
              }
            </SelectPicker>
            <View>
              <AppText style={[tw`text-xs mt-1 text-gray-500`]}>Recieved Amount</AppText>
              <TextInput editable={false} value={`${_.get(bookingforCheckIn, "rentWithDiscount")}`} onChangeText={(t) => setamount(t)} style={[tw`h-8 w-full rounded p-1 border-b-2 border-gray-200`, { fontSize: 11 }]} />
            </View>
            <View>
              <AppText style={[tw`text-xs mt-1 text-gray-500`]}>Refund Amount</AppText>
              <TextInput value={amount} keyboardType='number-pad' onChangeText={(t) => setamount(t)} style={[tw`h-8 w-full rounded p-1 border-b-2 border-gray-200`, { fontSize: 11 }]} />
            </View>
          </Dialog.Content>
          <StyleButton title={i18n.t("Cancel")} borderColor="#17A1FA" textStyle={{ fontSize: 11 }} style={{ width: '32%', margin: 10, height: 32, alignSelf: 'flex-end' }} onPress={() => {
            cancelButtonCalled()
          }} />
        </Dialog>
      </Portal>
      <AppSearchBar closeSheet={closeSheet} onChangeSearch={onChangeSearch}
        searchQuery={searchQuery} />
      <FlatList
        data={todaysPickuplocal}
        keyExtractor={(item, index) => item._id}
        renderItem={({ item }) => <CheckInDetailsCard
          setBookingforCheckIn={setBookingforCheckIn}
          key={item._id}
          item={item}
          mobileNumber={_.get(item, "_webuserId.profile.mobileNumber")}
          userName={_.get(item, "_webuserId.profile.name")}
          email={_.get(item, "_webuserId.email")}
          startDate={item.startDate as string}
          endDate={item.endDate as string}
          storeDetail={storeDetail}
          bookingType={item.bookingType}
          boonggBookingId={item.boonggBookingId}
          setvisibleDialog={toggleDialog as () => void}
          checkInFunc={checkInFunc as () => void}
          city={_.get(currentCity, '_city.name')}
        />}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
          >
            <View style={styles.contentContainer}>
              <TouchableOpacity onPress={() => closeSheet()}>
                <AppText style={[tw`my-1`, { color: colors.purple, fontSize: 14 }]}>{i18n.t("Today's")} {i18n.t("Pickup")}</AppText>
              </TouchableOpacity>
              <View style={[tw`flex-row justify-between p-1 bg-gray-200 rounded-md`, { height: 80 }]}>
                <View>
                  <AppText style={[tw``, { fontSize: 11 }]}>{_.get(bookingforCheckIn, "_webuserId.profile.name")}</AppText>
                  <AppText style={[tw`font-bold`, { fontSize: 13 }]}>{_.get(bookingforCheckIn, "brand")} {_.get(bookingforCheckIn, "model")}</AppText>
                  <AppText style={[tw``, { fontSize: 9 }]}>{_.get(bookingforCheckIn, "boonggBookingId")}</AppText>
                </View>
                <View>
                  <AppText style={[tw`self-end`, { fontSize: 7, color: colors.green }]}>{_.get(bookingforCheckIn, "bookingType")}</AppText>
                  <AppText style={[tw``, { fontSize: 9 }]}>{_.get(bookingforCheckIn, "_webuserId.email")}</AppText>
                  <AppText style={[tw`self-end`, { fontSize: 9, color: colors.purple }]}>{_.get(bookingforCheckIn, "_webuserId.profile.mobileNumber")}</AppText>
                </View>
              </View>
              {/* timebox */}
              <View style={[tw`flex-row justify-between items-center my-2`, { height: 50 }]}>
                <View style={tw`flex-row justify-between p-1 bg-gray-200 rounded-md w-4.7/10 `}>
                  <View>
                    <AppText style={[tw``, { fontSize: 9 }]}>From</AppText>
                    <AppText style={[tw``, { fontSize: 9 }]}>{moment(_.get(bookingforCheckIn, "startDate")).format('lll')}</AppText>
                  </View>
                </View>
                <View style={tw`flex-row justify-between p-1 bg-gray-200 rounded-md w-4.7/10 `}>
                  <View>
                    <AppText style={[tw``, { fontSize: 9 }]}>To</AppText>
                    <AppText style={[tw``, { fontSize: 9 }]}>{moment(_.get(bookingforCheckIn, "endDate")).format('lll')}</AppText>
                  </View>
                </View>
              </View>
              {/* kycbox */}
              <View style={[tw`bg-gray-100 rounded-lg `, { height: 130 }]}>
                <AppText style={[tw`ml-2 font-bold`, { fontSize: 9.5 }]}>KYC</AppText>
                <View style={[tw`flex-row justify-between`, {}]}>
                  <View style={tw`w-1/2 items-center`}>
                    {
                      _.get(bookingforCheckIn, "_webuserId.profile.aadhar") ?
                        <TouchableOpacity style={tw`w-full items-center h-7/10`} onPress={() => {
                          openImageDialog(bookingforCheckIn)
                        }}>
                          <Image source={{ uri: _.get(bookingforCheckIn, "_webuserId.profile.aadhar") }} style={[tw`w-9/10 rounded-md`, { height: '100%' }]} />
                        </TouchableOpacity>
                        : <View style={[tw`w-9/10 bg-gray-300 rounded-lg`, { height: '68%' }]} />
                    }
                    <AppText style={[tw``, { fontSize: 9, }]}>Aadhar</AppText>
                  </View>
                  <View style={tw`w-1/2 items-center`}>
                    {
                      _.get(bookingforCheckIn, "_webuserId.profile.newDriving") ?
                        <TouchableOpacity style={tw`w-full items-center h-7/10`} onPress={() => {
                          openImageDialog(bookingforCheckIn)
                        }}>
                          <Image source={{ uri: _.get(bookingforCheckIn, "_webuserId.profile.newDriving") }} style={[tw`w-9/10 rounded-md`, { height: '100%' }]} />
                        </TouchableOpacity>
                        : <View style={[tw`w-9/10 bg-gray-300 rounded-lg`, { height: '68%' }]} />
                    }
                    <AppText style={[tw``, { fontSize: 9, }]}>Licence</AppText>
                  </View>
                </View>
              </View>
              <View style={[tw`flex-row justify-between`, { height: 60 }]}>
                <AppButton
                  onPress={() => {
                    closeSheet()
                    dispatch(fetchBikestotransferBookings({
                      startDate: Date.parse(_.get(bookingforCheckIn, "startDate")),
                      endDate: Date.parse(_.get(bookingforCheckIn, "endDate")),
                      Bikemodel: {
                        brand: _.get(bookingforCheckIn, "brand"),
                        modelName: _.get(bookingforCheckIn, "model")
                      },
                      city: _.get(currentCity, '_city.name')
                    }))
                    toggleDialog("transfer")
                  }
                  }
                  title='Transfer Booking'
                  textStyle={{ color: '#17A1FA', fontWeight: '500', fontSize: 9, alignSelf: 'center' }}
                  style={{ borderColor: '#17A1FA', width: '45%', borderWidth: 1, backgroundColor: "rgba(23, 161, 250, 0.2)" }} />
                <AppButton
                  onPress={() => {
                    toggleDialog("cancel")
                    closeSheet()
                  }}
                  title="Cancel"
                  textStyle={{ color: '#B2212D', fontWeight: '500', fontSize: 9 }}
                  style={[tw``, { borderColor: '#B2212D', width: '45%', borderWidth: 1, backgroundColor: "rgba(178, 33, 45, 0.2)" }]} />
              </View>
              <View style={[tw``, { height: 60 }]}>
                <AppButton
                  onPress={() => {
                    dispatch(getuser(_.get(bookingforCheckIn, "_webuserId.profile.mobileNumber")))
                    dispatch(getUserbyMobileNo(_.get(bookingforCheckIn, "_webuserId.profile.mobileNumber")))
                    dispatch(getrentbookinguserOngoing(_.get(bookingforCheckIn, "_webuserId._id")))
                    navigation.navigate(routes.CREATE_BOOKING_N.route, { screen: routes.CHECKIN_SCREEN.route })
                    closeSheet()
                  }}
                  title="Check In"
                  textStyle={[tw`m-0`, { color: colors.green, fontWeight: '500', fontSize: 9 }]}
                  style={{ borderColor: colors.green, borderWidth: 1, backgroundColor: "#fff" }} />
              </View>
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  contentContainer: {
    height: '100%',
    padding: 8,
    justifyContent: 'space-around'
  },
});

export default React.memo(TodaysPickupScreen);