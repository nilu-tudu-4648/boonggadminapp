import tw from "@/lib/tailwind";
import { Picker as SelectPicker } from "@react-native-picker/picker";
import { createBookingPay, getrentbookingListBooked, getrentbookinguserOngoing, getrentpoolList, stepCountValuesaveToReducers, toggleImmediacheckout } from "@/store/createBooking";
import React, { useEffect, useState } from "react";
import { BackHandler, ScrollView, StyleSheet, View } from "react-native";
import {
  Checkbox,
  TextInput,
} from "react-native-paper";
import { useDispatch } from "react-redux";
import AppText from "../../components/AppText";
import routes from "@/navigation/routes";
import { useAppSelector } from "@/hooks/useAppSelector";
import colors from '../../config/colors';
import ActivityIndicator from "@/components/CustomActivityIndicator";
import AppButton from "@/components/AppButton";
import _ from "lodash";
import { loadAllBikesListMaintenance } from "@/store/rentPool";
interface DialogProps {
  route: any,
  navigation: any
}
interface Props {
  selectedOffer: any;
  selectedPayment: string | undefined;
  remarkTypes: string;
  remarkTypeInputValue: string;
}
const CreateBookingPayScreen: React.FC<DialogProps> = ({
  navigation,
  route
}) => {
  const { loading, UserbyMobileNo, coupenList, assignVisible } =
    useAppSelector((state) => state.entities.createBooking);
  const { storeDetail, storeName } = useAppSelector((state: any) => state.entities.searchBikes);
  const { selectedBike, startDate, endDate, mobilenotofetch } = route.params;
  const [paynowDialogdetails, setpaynowDialogdetails] = useState({
    boonggRent: selectedBike.rentCalculated,
    SGST: "",
    CGST: "",
    totalRent: "",
    totalCalulatedRent: "",
    suggestedRent: selectedBike.rentCalculated,
  });
  const [applyDiscount, setapplyDiscount] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [menuItems, setmenuItems] = React.useState<Props>({
    selectedOffer: "Select",
    selectedPayment: "Select Payment",
    remarkTypes: "Remark Type",
    remarkTypeInputValue: "",
  });
  const totalRentCalculate = Number(paynowDialogdetails.boonggRent ? paynowDialogdetails.boonggRent : selectedBike?.rentCalculated) + Number(paynowDialogdetails.SGST) + Number(paynowDialogdetails.CGST)
  const discountApplied = (totalRentCalculate - (menuItems.selectedOffer.maxDiscount || 0))
  const [checkBoxVisible, setcheckBoxVisible] = useState({
    applyDiscount: false,
    immediateChekout: false,
    payatStore: true,
  });
  const paymentitems = [
    "Payment Type",
    "CASH",
    "DEBIT/CREDIT CARD",
    "ONLINE/UPI PAYMENTS",
    "PAYTM",
    "PHONEPE",
    "GOOGLEPE",
    "MOBIKWIK",
    "CHEQUE",
    "PENDING",
  ];
  const remarkTypes = [
    "Remark Type",
    "OFFLINE TO ONLINE",
    "FULL PAYMENT PENDING",
    "PARTIAL PAYMENT PENDING",
    "OTHER",
  ];
  const dispatch = useDispatch()
  const paynowCall = async () => {
    setisLoading(true)
    const formdata = {
      username: UserbyMobileNo ? UserbyMobileNo[0].profile.name || UserbyMobileNo.profile.name : "",
      emailid: UserbyMobileNo ? UserbyMobileNo[0].email || UserbyMobileNo.email : "",
      paymentType: "OFFLINE",
      notesType: menuItems.remarkTypes,
      notesRemark: menuItems.remarkTypeInputValue,
      paymentTypeMode: "5c8b4236848f94349c96865e",
      rentTotal: paynowDialogdetails.boonggRent,
      suggestedRent: paynowDialogdetails.suggestedRent,
      recivableAmountWithTax: paynowDialogdetails.boonggRent,
      discountAmount: paynowDialogdetails.boonggRent,
      location: storeName,
      storeKey: `${_.get(storeDetail, "user._store")}`,
      webUserId: UserbyMobileNo ? UserbyMobileNo[0]._id || UserbyMobileNo._id : "",
      mobileNo: mobilenotofetch,
      isGstApplicable: false,
      bikeList: [
        {
          ...selectedBike,
          isAddtoCart: true,
          startDate: Date.parse(startDate),
          endDate: Date.parse(endDate),
          cartRent: paynowDialogdetails.boonggRent,
          cartQuantity: 1,
          quantityList: [1],
        },
      ],
    };
    dispatch(createBookingPay(formdata))
    dispatch(getrentbookinguserOngoing(UserbyMobileNo[0]._id))
    dispatch(getrentbookingListBooked(`${_.get(storeDetail, "user._store")}`))
    dispatch(loadAllBikesListMaintenance(`${_.get(storeDetail, "user._store")}`))
    dispatch(getrentpoolList(`${_.get(storeDetail, "user._store")}`))
    dispatch(stepCountValuesaveToReducers(2))
  };
  useEffect(() => {
    if (assignVisible) {
      if (checkBoxVisible.immediateChekout) {
        navigation.navigate(routes.CHECKIN_SCREEN.route)
      } else {
        navigation.navigate(routes.DASHBOARD.route)
      }
    }
  }, [assignVisible])
  BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.replace(routes.CREATE_BOOKING.route, { mobilenotofetch })
    return () => true
  }, [])
  return (
    <View style={[tw`bg-white p-2`, { flex: 1 }]}>
      <ActivityIndicator visible={loading || isLoading} />
      <ScrollView keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false} contentContainerStyle={tw`w-full p-2`}>
        <View style={tw`my-1`} >
          <TextInput
            label={'Total Calculated Rent'}
            editable={false}
            value={paynowDialogdetails.boonggRent ? paynowDialogdetails.boonggRent : selectedBike?.rentCalculated}
            onChangeText={(t) =>
              setpaynowDialogdetails({
                ...paynowDialogdetails,
                boonggRent: t,
              })
            }
            style={tw`text-xs bg-white h-15 w-full`}
            dense
          />
        </View>
        {/* DiscountBox */}
        <View style={tw`flex-row my-1 items-center h-11 justify-between `}>
          <View style={tw`flex-row items-center w-2/5`}>
            <Checkbox
              color={colors.purple}
              status={applyDiscount ? "checked" : "unchecked"}
              onPress={() => {
                setapplyDiscount(!applyDiscount);
              }}
            />
            <AppText style={{ fontSize: 12 }}>Apply Discount</AppText>
          </View>
          <View style={tw`w-2.4/5`}>
            <SelectPicker
              enabled={applyDiscount}
              style={tw`w-full bg-gray-100`}
              selectedValue={menuItems.selectedOffer}
              onValueChange={(itemValue, itemIndex) => {
                setmenuItems({ ...menuItems, selectedOffer: itemValue })
              }
              }>
              <SelectPicker.Item style={{ fontSize: 11 }} label={'Coupon Code'} value={'Select'} />
              {coupenList?.map((ite, i) => (
                <SelectPicker.Item style={{ fontSize: 11 }} key={i} label={ite.coupenCode + ` ${ite.discountInPrecentOrFlat}%`} value={ite} />
              ))}
            </SelectPicker>
          </View>
        </View>
        {menuItems.selectedOffer !== "Select" && applyDiscount && (
          <AppText style={[tw`text-sm  text-center`, { fontSize: 11, color: colors.purple }]}>
            {`${menuItems.selectedOffer.maxDiscount || ""} Discount Applied`}
          </AppText>
        )}
        {/* FourInputs */}
        {/* <View style={tw`w-full flex-row items-center justify-between `}>
              <TextInput
                value={paynowDialogdetails.SGST}
                label="SGST"
                keyboardType="numeric"
                onChangeText={(t) =>
                  setpaynowDialogdetails({ ...paynowDialogdetails, SGST: t })
                }
                style={[tw`bg-white`, { width: "47%", fontSize: 10 }]}
              />
              <TextInput
                value={paynowDialogdetails.CGST}
                label="CGST"
                keyboardType="numeric"
                onChangeText={(t) =>
                  setpaynowDialogdetails({ ...paynowDialogdetails, CGST: t })
                }
                style={[tw`bg-white`, { width: "47%", fontSize: 10 }]}
              />
            </View> */}
        {/* <View
          style={tw`w-full my-3 `}> */}
        {/* <View style={[{ height: '100%', width: "47%", borderBottomColor: 'gray', borderBottomWidth: 1 }]}>
            <AppText style={{ fontSize: 10, paddingLeft: 12 }}>Total rent</AppText>
            <AppText style={{ fontSize: 10, paddingLeft: 15, width: '100%' }}>{selectedBike?.rentCalculated}</AppText>
          </View> */}
        {/* </View> */}
        <View style={tw``} >
          <TextInput
            label={'Suggested Rent'}
            value={paynowDialogdetails.suggestedRent}
            keyboardType={"numeric"}
            style={tw`text-xs bg-white h-15 w-full`}
            onChangeText={(t) =>
              setpaynowDialogdetails({
                ...paynowDialogdetails,
                suggestedRent: t,
              })
            }
          />
        </View>
        <View style={tw``} >
          <TextInput
            label={'Boongg Rent'}
            editable={false}
            value={`${applyDiscount ? discountApplied : totalRentCalculate || '0'}`}
            style={tw`text-xs bg-white h-15 w-full`}
          />
        </View>
        <SelectPicker
          style={tw`w-full bg-gray-100 my-2`}
          selectedValue={menuItems.remarkTypes}
          onValueChange={(itemValue, itemIndex) => {
            setmenuItems({ ...menuItems, remarkTypes: itemValue })
          }
          }>
          {remarkTypes?.map((ite, i) => (
            <SelectPicker.Item style={{ fontSize: 11 }}
              key={i} label={ite} value={ite}
            />
          ))}
        </SelectPicker>
        {
          menuItems.remarkTypes === "FULL PAYMENT PENDING" ?
            null : menuItems.remarkTypes === "Remark Type" ? null :
              <View style={tw` flex-row items-center justify-between `} >
                <TextInput
                  label={menuItems.remarkTypes === "OFFLINE TO ONLINE"
                    ? "Transaction Id" : menuItems.remarkTypes === "PARTIAL PAYMENT PENDING" ?
                      "Amount" : menuItems.remarkTypes === "OTHER" ? "Remarks" : 'Transaction Id'}
                  value={menuItems.remarkTypeInputValue}
                  onChangeText={(t) =>
                    setmenuItems({ ...menuItems, remarkTypeInputValue: t })
                  }
                  style={tw`text-xs bg-white h-15 w-full`}
                  dense
                />
              </View>
        }
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center`}>
            <Checkbox
              color={colors.purple}
              status={checkBoxVisible.payatStore ? "checked" : "unchecked"}
            // onPress={() => {
            //   setcheckBoxVisible({
            //     ...checkBoxVisible,
            //     payatStore: !checkBoxVisible.payatStore,
            //   });
            // }}
            />
            <AppText style={{ fontSize: 12 }}>Pay At Store</AppText>
          </View>
          <View style={tw`flex-row items-center my-3`}>
            <Checkbox
              status={
                checkBoxVisible.immediateChekout ? "checked" : "unchecked"
              }
              color={colors.purple}
              onPress={() => {
                setcheckBoxVisible({
                  ...checkBoxVisible,
                  immediateChekout: !checkBoxVisible.immediateChekout,
                });
                dispatch(toggleImmediacheckout())
              }}
            />
            <AppText style={{ fontSize: 12 }}>
              Immediate Checkout
            </AppText>
          </View>
        </View>
        <SelectPicker
          style={tw`w-full bg-gray-100`}
          selectedValue={menuItems.selectedPayment}
          placeholder='Select Payment'
          onValueChange={(itemValue, itemIndex) => {
            setmenuItems({ ...menuItems, selectedPayment: itemValue });
          }
          }>
          {paymentitems?.map((ite, i) => (
            <SelectPicker.Item style={{ fontSize: 11 }} key={i} label={ite} value={ite} />
          ))}
        </SelectPicker>
        <AppButton title='Pay Now' onPress={() =>
          paynowCall()
        } />
      </ScrollView>
    </View>
  );
};

export default CreateBookingPayScreen;

const styles = StyleSheet.create({});
