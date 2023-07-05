import ExtendDateDialog from "@/components/ExtendDateDialog";
import ModifiedVehicleDialog from "@/components/ModifiedVehicleDialog";
import { RootState } from "@/types/RootStateType";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, FlatList, } from "react-native";
import _ from "lodash";
import tw from "@/lib/tailwind";
import { useAppSelector } from "@/hooks/useAppSelector";
import useMap from "react-use/lib/useMap";
import ActivityIndicator from "@/components/CustomActivityIndicator";
import BookingDetailsDropDetailsCard from "@/components/BookingDetailsDropDetailsCard";
import RentBookingRequestCompleteDialog from "@/components/RentBookingRequestCompleteDialog";
import { loadOngoingBookings } from "@/store/ongoingBooking";
import { getrentpoolList } from "@/store/createBooking";
import AppButton from "@/components/AppButton";
import AppText from "@/components/AppText";
import colors from "../config/colors";
import moment from "moment";
import { BottomSheetModal, BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
import ShowImageDialogonDrop from "@/components/ShowImageondrop";
import AppSearchBar from "@/components/AppSearchBar";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { SIZES } from "../config/styles";
import { useNavigationState } from "@react-navigation/native";
interface ExtendedDropScreenProps { }

const ExtendedDropScreen: React.FC<ExtendedDropScreenProps> = (props) => {

  const { loading, extendedDrop, modifiedRequest, completeBookingRequest }
    = useAppSelector((state: any) => state.entities.ongoingBooking);
  const { storeDetail } = useAppSelector((state: RootState) => state.entities.searchBikes);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // variables
  const snapPoints = useMemo(() => ["80%", '95%'], []);
  // const snapPoints = useMemo(() => [400, 470], []);
  // callbacks
  const openSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const closeSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const dispatch = useAppDispatch();
  const [visibleDialog, setvisibleDialog] = useState<string>('')
  const [selectedBikeforModify, setselectedBikeforModify] = useState<any>({})
  const [extendedDroplocal, setextendedDroplocal] = React.useState<any>(extendedDrop);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [imageUrl, setimageUrl] = React.useState({});
  const [refreshing, setrefreshing] = useState(false)
  const apiCalls = () => {
    dispatch(loadOngoingBookings(`${_.get(storeDetail, "user._store")}`));
    dispatch(getrentpoolList(`${_.get(storeDetail, "user._store")}`))
  }
  const navigationState = useNavigationState(state => state);
  const activeRouteName = navigationState.routes[navigationState.index].name;
  const onRefresh = () => {
    setrefreshing(true)
    apiCalls()
    setrefreshing(false)
  }
  useEffect(() => {
    if (activeRouteName === "ExtendedDrop") {
      apiCalls()
    }
  }, [modifiedRequest, completeBookingRequest]);
  const onChangeSearch = useCallback((query: string) => {
    if (query) {
      setextendedDroplocal(extendedDrop.filter(ite =>
        _.get(ite, "boonggBookingId", "").includes(query) ||
        _.get(ite, "_webuserId.profile.name", "").includes(query) ||
        _.get(ite, "_webuserId.profile.mobileNumber", "").includes(query)
      ))
    } else {
      setextendedDroplocal(extendedDrop)
    }
    setSearchQuery(query)
  }, [searchQuery])
  const openImageDialog = (urls: object) => {
    setimageUrl(urls)
    setvisibleDialog("imagesdialog")
  }
  return (
    <View style={[tw`bg-white`, { flex: 1 }]}>
      <ActivityIndicator visible={loading} />
      <ModifiedVehicleDialog
        visible={visibleDialog === "modifyVehicle"}
        hideDialog={setvisibleDialog}
        selectedBikeforModify={selectedBikeforModify}
      />
      <ExtendDateDialog
        visible={visibleDialog === "extendDate"}
        hideDialog={setvisibleDialog}
      />
      <ShowImageDialogonDrop
        visible={visibleDialog === "imagesdialog"}
        hideDialog={setvisibleDialog}
        imageUrl={imageUrl}
      />
      <RentBookingRequestCompleteDialog
        visible={visibleDialog === "RentBookingRequestCompleteDialog"}
        hideDialog={setvisibleDialog as () => void}
        selectedBikeforModify={selectedBikeforModify}
      />
      <AppSearchBar closeSheet={closeSheet} onChangeSearch={onChangeSearch}
        searchQuery={searchQuery} />
      <FlatList
        data={extendedDroplocal}
        keyExtractor={(item, index) => item._id}
        renderItem={({ item }) => <BookingDetailsDropDetailsCard
          openSheet={openSheet}
          setBookingforCheckIn={setselectedBikeforModify}
          key={item._id}
          item={item}
          mobileNumber={_.get(item, "_webuserId.profile.mobileNumber")}
          userName={_.get(item, "_webuserId.profile.name")}
          email={_.get(item, "_webuserId.email")}
          startDate={item.startDate as string}
          endDate={item.endDate as string}
          bookingType={item.bookingType}
          boonggBookingId={item.boonggBookingId}
          setvisibleDialog={setvisibleDialog}
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
                <AppText style={[tw`my-1`, { color: colors.purple, fontSize: 14 }]}>{`Extended Drop`}</AppText>
              </TouchableOpacity>
              <View style={[tw`flex-row justify-between p-1 bg-gray-200 rounded-md`, { height: SIZES.height * .1 }]}>
                <View>
                  <AppText style={[tw``, { fontSize: 11 }]}>{_.get(selectedBikeforModify, "_webuserId.profile.name")}</AppText>
                  <AppText style={[tw`font-bold`, { fontSize: 13 }]}>{_.get(selectedBikeforModify, "brand")} {_.get(selectedBikeforModify, "model")}</AppText>
                  <AppText style={[tw``, { fontSize: 9 }]}>{_.get(selectedBikeforModify, "boonggBookingId")}</AppText>
                </View>
                <View>
                  <AppText style={[tw`self-end`, { fontSize: 7, color: colors.green }]}>{_.get(selectedBikeforModify, "bookingType")}</AppText>
                  <AppText style={[tw``, { fontSize: 9 }]}>{_.get(selectedBikeforModify, "_webuserId.email")}</AppText>
                  <AppText style={[tw`self-end`, { fontSize: 9, color: colors.purple }]}>{_.get(selectedBikeforModify, "_webuserId.profile.mobileNumber")}</AppText>
                </View>
              </View>
              {/* timebox */}
              <View style={[tw`flex-row justify-between items-center my-2`, { height: SIZES.height * .06 }]}>
                <View style={tw`flex-row justify-between p-1 bg-gray-200 rounded-md w-4.7/10 `}>
                  <View>
                    <AppText style={[tw``, { fontSize: 9 }]}>From</AppText>
                    <AppText style={[tw``, { fontSize: 9 }]}>{moment(_.get(selectedBikeforModify, "startDate")).format('lll')}</AppText>
                  </View>
                </View>
                <View style={tw`flex-row justify-between p-1 bg-gray-200 rounded-md w-4.7/10 `}>
                  <View>
                    <AppText style={[tw``, { fontSize: 9 }]}>To</AppText>
                    <AppText style={[tw``, { fontSize: 9 }]}>{moment(_.get(selectedBikeforModify, "endDate")).format('lll')}</AppText>
                  </View>
                </View>
              </View>
              {/* kycbox */}
              <View style={[tw`bg-gray-100 rounded-lg`, { height: SIZES.height * .31 }]}>
                <AppText style={[tw`ml-2 font-bold`, { fontSize: 9.5 }]}>Images</AppText>
                <View style={[tw`flex-row justify-between`, {}]}>
                  <View style={tw`w-1/3 items-center`}>
                    {
                      _.get(selectedBikeforModify, "checkInInfo.images.front") ?
                        <TouchableOpacity style={tw`w-full items-center`} onPress={() => {
                          openImageDialog(selectedBikeforModify)
                        }}>
                          <Image source={{ uri: _.get(selectedBikeforModify, "checkInInfo.images.front") }} style={[tw`w-9/10 rounded-md`, { height: SIZES.height * .11 }]} />
                        </TouchableOpacity>
                        : <View style={[tw`w-9/10 bg-gray-300 rounded-lg`, { height: SIZES.height * .11 }]} />
                    }
                    <AppText style={[tw``, { fontSize: 9, }]}>Front</AppText>
                  </View>
                  <View style={tw`w-1/3 items-center`}>
                    {
                      _.get(selectedBikeforModify, "checkInInfo.images.back") ?
                        <TouchableOpacity style={tw`w-full items-center`} onPress={() => {
                          openImageDialog(selectedBikeforModify)
                        }}>
                          <Image source={{ uri: _.get(selectedBikeforModify, "checkInInfo.images.back") }} style={[tw`w-9/10 rounded-md`, { height: SIZES.height * .11 }]} />
                        </TouchableOpacity>
                        : <View style={[tw`w-9/10 bg-gray-300 rounded-lg`, { height: SIZES.height * .11 }]} />
                    }
                    <AppText style={[tw``, { fontSize: 9, }]}>Back</AppText>
                  </View>
                  <View style={tw`w-1/3 items-center`}>
                    {
                      _.get(selectedBikeforModify, "checkInInfo.images.left") ?
                        <TouchableOpacity style={tw`w-full items-center`} onPress={() => {
                          openImageDialog(selectedBikeforModify)
                        }}>
                          <Image source={{ uri: _.get(selectedBikeforModify, "checkInInfo.images.left") }} style={[tw`w-9/10 rounded-md`, { height: SIZES.height * .11 }]} />
                        </TouchableOpacity>
                        : <View style={[tw`w-9/10 bg-gray-300 rounded-lg`, { height: SIZES.height * .11 }]} />
                    }
                    <AppText style={[tw``, { fontSize: 9, }]}>Left</AppText>
                  </View>
                </View>
                <View style={[tw`flex-row justify-between`, {}]}>
                  <View style={tw`w-1/3 items-center`}>
                    {
                      _.get(selectedBikeforModify, "checkInInfo.images.right") ?
                        <TouchableOpacity style={tw`w-full items-center`} onPress={() => {
                          openImageDialog(selectedBikeforModify)
                        }}>
                          <Image source={{ uri: _.get(selectedBikeforModify, "checkInInfo.images.right") }} style={[tw`w-9/10 rounded-md`, { height: SIZES.height * .11 }]} />
                        </TouchableOpacity>
                        : <View style={[tw`w-9/10 bg-gray-300 rounded-lg`, { height: SIZES.height * .11 }]} />
                    }
                    <AppText style={[tw``, { fontSize: 9, }]}>Right</AppText>
                  </View>
                  <View style={tw`w-1/3 items-center`}>
                    {
                      _.get(selectedBikeforModify, "checkInInfo.images.selfieWithBike") ?
                        <TouchableOpacity style={tw`w-full items-center`} onPress={() => {
                          openImageDialog(selectedBikeforModify)
                        }}>
                          <Image source={{ uri: _.get(selectedBikeforModify, "checkInInfo.images.selfieWithBike") }} style={[tw`w-9/10 rounded-md`, { height: SIZES.height * .11 }]} />
                        </TouchableOpacity>
                        : <View style={[tw`w-9/10 bg-gray-300 rounded-lg`, { height: SIZES.height * .11 }]} />
                    }
                    <AppText style={[tw``, { fontSize: 9, }]}>Rider</AppText>
                  </View>
                  <View style={tw`w-1/3 items-center justify-between`}>
                    {
                      _.get(selectedBikeforModify, "_webuserId.profile.newDriving") ?
                        <View style={tw`flex-row w-full items-center justify-around`}>
                          <TouchableOpacity style={tw`w-full items-center`} onPress={() => {
                            openImageDialog(selectedBikeforModify)
                          }}>
                            <Image source={{ uri: _.get(selectedBikeforModify, "_webuserId.profile.newDriving") }} style={[tw`w-4.4/10 rounded-md`, { height: 40 }]} />
                          </TouchableOpacity>
                          <TouchableOpacity style={tw`w-full items-center`} onPress={() => {
                            openImageDialog(selectedBikeforModify)
                          }}>
                            <Image source={{ uri: _.get(selectedBikeforModify, "_webuserId.profile.aadhar") }} style={[tw`w-4.4/10 rounded-md`, { height: 40 }]} />
                          </TouchableOpacity>
                        </View>
                        : <View style={tw`flex-row w-full items-center justify-around`}>
                          <View style={[tw`w-4.4/10 bg-gray-300 rounded-lg`, { height: 40 }]} />
                          <View style={[tw`w-4.4/10 bg-gray-300 rounded-lg`, { height: 40 }]} />
                        </View>
                    }
                    {
                      _.get(selectedBikeforModify, "checkInInfo.kyc.aadhar") ?
                        <View style={tw`flex-row w-full items-center justify-around`}>
                          <TouchableOpacity style={tw`w-full items-center`} onPress={() => {
                            openImageDialog(selectedBikeforModify)
                          }}>
                            <Image source={{ uri: _.get(selectedBikeforModify, "checkInInfo.kyc.drivingLicence") }} style={[tw`w-4.4/10 rounded-md`, { height: 40 }]} />
                          </TouchableOpacity>
                          <TouchableOpacity style={tw`w-full items-center`} onPress={() => {
                            openImageDialog(selectedBikeforModify)
                          }}>
                            <Image source={{ uri: _.get(selectedBikeforModify, "checkInInfo.kyc.aadhar") }} style={[tw`w-4.4/10 rounded-md`, { height: 40 }]} />
                          </TouchableOpacity>
                        </View>
                        : <View style={tw`flex-row w-full items-center justify-around`}>
                          <View style={[tw`w-4.4/10 bg-gray-300 rounded-lg`, { height: 40 }]} />
                          <View style={[tw`w-4.4/10 bg-gray-300 rounded-lg`, { height: 40 }]} />
                        </View>
                    }
                    <AppText style={[tw``, { fontSize: 9, }]}>Documents</AppText>
                  </View>
                </View>
              </View>
              <AppButton
                onPress={() => {
                  closeSheet()
                }}
                title="Close"
                textStyle={[tw`m-0`, { color: colors.green, fontWeight: '500', fontSize: 11 }]}
                style={{ borderColor: colors.green, borderWidth: 1, backgroundColor: "#fff" }} />
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

export default ExtendedDropScreen;
