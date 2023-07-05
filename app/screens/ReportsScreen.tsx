import _ from "lodash";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import tw from "@/lib/tailwind";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { Picker as SelectPicker } from "@react-native-picker/picker";
import ScrollScreen from "@/components/ScrollScreen";
import AppText from "@/components/AppText";
import colors from "../config/colors";
import moment from "moment";
import StyleButton from "@/components/StyleButton";
import { DataTable } from "react-native-paper";
import { filterbyModel, filterbyRegNo, filterbyStore, getallbookingbydate, getallBrandlists, getallStores, getbrandNamewithBike, getRentPoolAllList } from "@/store/reports";

interface ReportsScreenProps { }

const ReportsScreen: React.FC<ReportsScreenProps> = (props) => {
    const { rentpollList, loading, brand, stores, allBookingbydate, totalcancelledBuisness,
        totalOnlineDiscount, totalOfflineDiscount, cancelledBookingoffline, cancelledBookingonline,
        offlineBooking, totalOnlineBuisness, onlineBooking, totalOfflineBuisness, cancelledBooking } = useAppSelector((state) => ({
            rentpollList: state.entities.reports.rentpollList,
            loading: state.entities.reports.loading,
            brand: state.entities.reports.brand,
            stores: state.entities.reports.stores,
            allBookingbydate: state.entities.reports.allBookingbydate,
            offlineBooking: state.entities.reports.offlineBooking,
            onlineBooking: state.entities.reports.onlineBooking,
            totalOnlineBuisness: state.entities.reports.totalOnlineBuisness,
            totalOfflineBuisness: state.entities.reports.totalOfflineBuisness,
            cancelledBooking: state.entities.reports.cancelledBooking,
            totalcancelledBuisness: state.entities.reports.totalcancelledBuisness,
            totalOnlineDiscount: state.entities.reports.totalOnlineDiscount,
            totalOfflineDiscount: state.entities.reports.totalOfflineDiscount,
            cancelledBookingoffline: state.entities.reports.cancelledBookingoffline,
            cancelledBookingonline: state.entities.reports.cancelledBookingonline,
        }));
    const dispatch = useAppDispatch();
    const [dateVisible, setdateVisible] = useState({
        startDate: false,
        endDate: false
    });
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectStore, setselectStore] = useState("");
    const [selectBrand, setselectBrand] = useState("");
    const [selectModel, setselectModel] = useState("");
    const [selectVehicleRegNo, setselectVehicleRegNo] = useState("");
    const [startDate, setstartDate] = useState<Date | undefined | number>(new Date().setMonth(new Date().getMonth() - 1));
    const [endDate, setendDate] = useState<number | string | undefined>(Date.parse(new Date()));
    const [selectedDate, setselectedDate] = useState("");
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date: Date) => {
        if (selectedDate === 'startDate') {
            setdateVisible({ ...dateVisible, startDate: true })
            setstartDate(Date.parse(date))
        } else {
            setdateVisible({ ...dateVisible, endDate: true })
            setendDate(Date.parse(date))
        }
        hideDatePicker();
    };
    useEffect(() => {
        dispatch(getRentPoolAllList());
        dispatch(getallStores());
        dispatch(getallBrandlists())
        dispatch(getallbookingbydate(startDate, endDate))
    }, []);
    return (
        <>
            <CustomActivityIndicator visible={loading} />
            <ScrollScreen style={{ height: '100%', padding: 5, paddingBottom: 50 }}>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                <View style={tw`my-2 bg-gray-100 p-2 rounded-md w-full`}>
                    <AppText style={tw`text-gray-500 font-semibold text-sm`}>
                        Total Records
                    </AppText>
                </View>
                <View
                    style={[
                        tw`flex-row justify-between items-center my-1`
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
                <StyleButton
                    title="Search Bikes"
                    borderColor={colors.purple}
                    textStyle={[tw`font-bold`, { fontSize: 12, color: 'white', }]}
                    style={{ width: '100%', marginVertical: 4, height: 45, backgroundColor: colors.purple, alignSelf: 'center' }}
                    onPress={() => {
                        dispatch(
                            getallbookingbydate(
                                startDate,
                                endDate
                            ))
                    }} />
                <View style={tw`flex-row justify-between items-center my-1`}>
                    <SelectPicker
                        style={tw`w-2.4/5 bg-gray-100`}
                        selectedValue={selectStore}
                        placeholder='Select Store'
                        onValueChange={(itemValue, itemIndex) => {
                            setselectStore(itemValue)
                            dispatch(filterbyStore(itemValue))
                        }}>
                        <SelectPicker.Item style={{ fontSize: 11 }} label={'Select Store'} value={'Select'} />
                        {
                            stores.map((ite, i) => {
                                return (
                                    <SelectPicker.Item key={i} style={{ fontSize: 11, color: 'black' }} label={_.get(ite, "locality[0]")} value={_.get(ite, "locality[0]")} />
                                )
                            })
                        }
                    </SelectPicker>
                    <SelectPicker
                        style={tw`w-2.4/5 bg-gray-100`}
                        selectedValue={selectBrand}
                        placeholder='Select Bike'
                        onValueChange={(itemValue) => {
                            setselectBrand(itemValue)
                            setselectModel("")
                            setselectVehicleRegNo("")
                            if (itemValue === "Select Brand") {
                                dispatch(getallbookingbydate(startDate, endDate))
                            } else {
                                dispatch(getbrandNamewithBike(_.get(itemValue, "brandName")))
                            }
                        }
                        }>
                        <SelectPicker.Item style={{ fontSize: 11 }} label={'Select Brand'} value={'Select Brand'} />
                        {
                            brand.map((ite, i) => {
                                return (
                                    <SelectPicker.Item key={i} style={{ fontSize: 11, color: 'black' }} label={_.get(ite, "brandName")} value={ite} />
                                )
                            })
                        }
                    </SelectPicker>
                </View>
                <View style={tw`flex-row justify-between items-center my-1`}>
                    <SelectPicker
                        style={tw`w-2.4/5 bg-gray-100`}
                        selectedValue={selectModel}
                        placeholder='Select Bike'
                        onValueChange={(itemValue, itemIndex) => {
                            setselectModel(itemValue)
                            setselectVehicleRegNo("")
                            dispatch(filterbyModel(itemValue))
                        }
                        }>
                        <SelectPicker.Item style={{ fontSize: 11 }} label={'Select Model'} value={'Select Model'} />
                        {
                            _.get(selectBrand, "models", []).map((ite: any) => {
                                return (
                                    <SelectPicker.Item key={ite} style={{ fontSize: 11, color: 'black' }} label={ite} value={ite} />
                                )
                            })
                        }
                    </SelectPicker>
                    <SelectPicker
                        style={tw`w-2.4/5 bg-gray-100`}
                        selectedValue={selectVehicleRegNo}
                        placeholder='Select Bike'
                        onValueChange={(itemValue, itemIndex) => {
                            if (itemValue === "Select") {
                                dispatch(filterbyModel(selectModel))
                                setselectVehicleRegNo(itemValue)
                            } else {
                                dispatch(filterbyRegNo(itemValue))
                                setselectVehicleRegNo(itemValue)
                            }
                        }
                        }>
                        <SelectPicker.Item style={{ fontSize: 11 }} label={'Select Vehicle Reg No'} value={'Select'} />
                        {
                            rentpollList.map((ite, i) => {
                                return (
                                    <SelectPicker.Item key={i} style={{ fontSize: 11 }} label={_.get(ite, "registrationNumber")} value={_.get(ite, "registrationNumber")} />
                                )
                            })
                        }
                    </SelectPicker>
                </View>
                <StyleButton
                    title="Download CSV"
                    borderColor={colors.purple}
                    textStyle={[tw`font-bold`, { fontSize: 12, color: 'white', }]}
                    style={{ width: '100%', marginVertical: 4, height: 45, backgroundColor: colors.purple, alignSelf: 'center' }}
                    onPress={() => {
                        dispatch(
                            getallbookingbydate(
                                1668277800000,
                                1670956200000
                            ))
                    }} />
                <View style={tw`my-2 bg-gray-100 p-2 rounded-md w-full`}>
                    <AppText style={tw`text-gray-500 font-semibold text-sm`}>
                        View Reports
                    </AppText>
                </View>
                <DataTable style={tw`mb-2`}>
                    <DataTable.Header style={tw`bg-gray-200`}>
                        <View style={styles.left}>
                            <AppText style={{ fontSize: 12, fontWeight: '500' }}>
                                Title
                            </AppText>
                        </View>
                        <View style={styles.right}>
                            <AppText style={{ fontSize: 12, fontWeight: '500' }}>
                                Count/Sum
                            </AppText>
                        </View>
                    </DataTable.Header>
                    <DataTable.Row style={{ flexDirection: 'row', height: 45, }}>
                        <View style={styles.left}>
                            <AppText style={styles.tablefont}>
                                Total Business
                            </AppText>
                        </View>
                        <View style={styles.right}>
                            <AppText style={styles.tablefont}>
                                {totalOfflineBuisness + totalOnlineBuisness}
                            </AppText>
                        </View>
                    </DataTable.Row>
                    <DataTable.Row style={[tw`bg-gray-100`, { flexDirection: 'row', height: 45 }]}>
                        <View style={styles.left}>
                            <AppText style={styles.tablefont}>
                                Total Business without GST:
                            </AppText>
                        </View>
                        <View style={styles.right}>
                            <AppText style={styles.tablefont}>
                                {totalOfflineBuisness + totalOnlineBuisness}
                            </AppText>
                        </View>
                    </DataTable.Row>
                    <DataTable.Row style={{ flexDirection: 'row', height: 45, }}>
                        <View style={styles.left}>
                            <AppText style={styles.tablefont}>
                                CGST:
                            </AppText>
                        </View>
                        <View style={styles.right}>
                            <AppText style={styles.tablefont}>
                                {allBookingbydate.map(ite => _.get(ite, "cGst")).reduce((p, c) => { return p + c }, 0)}
                            </AppText>
                        </View>
                    </DataTable.Row>
                    <DataTable.Row style={[tw`bg-gray-100`, { flexDirection: 'row', height: 45 }]}>
                        <View style={styles.left}>
                            <AppText style={styles.tablefont}>
                                SGST:
                            </AppText>
                        </View>
                        <View style={styles.right}>
                            <AppText style={styles.tablefont}>
                                {allBookingbydate.map(ite => _.get(ite, "sGst")).reduce((p, c) => { return p + c }, 0)}
                            </AppText>
                        </View>
                    </DataTable.Row>
                    <DataTable.Row style={{ flexDirection: 'row', height: 45, }}>
                        <View style={styles.left}>
                            <AppText style={styles.tablefont}>
                                Total Number of Bookings:
                            </AppText>
                        </View>
                        <View style={styles.right}>
                            <AppText style={styles.tablefont}>
                                {allBookingbydate.length}
                            </AppText>
                        </View>
                    </DataTable.Row>
                    {/* <DataTable.Row style={[tw`bg-gray-100`, { flexDirection: 'row', height: 45 }]}>
                        <View style={styles.left}>
                            <AppText style={styles.tablefont}>
                                Avg Allocation of Vehicle:
                            </AppText>
                        </View>
                        <View style={styles.right}>
                            <AppText style={styles.tablefont}>
                                1234123
                            </AppText>
                        </View>
                    </DataTable.Row> */}
                    <DataTable.Row style={{ flexDirection: 'row', height: 45, }}>
                        <View style={styles.left}>
                            <AppText style={styles.tablefont}>
                                Total No of Cancellation Bookings:
                            </AppText>
                        </View>
                        <View style={styles.right}>
                            <AppText style={styles.tablefont}>
                                {cancelledBooking.length}
                            </AppText>
                        </View>
                    </DataTable.Row>
                    <DataTable.Row style={[tw`bg-gray-100`, { flexDirection: 'row', height: 45 }]}>
                        <View style={styles.left}>
                            <AppText style={styles.tablefont}>
                                Total Cancellation Business:
                            </AppText>
                        </View>
                        <View style={styles.right}>
                            <AppText style={styles.tablefont}>
                                {Math.round(totalcancelledBuisness)}
                            </AppText>
                        </View>
                    </DataTable.Row>
                    <DataTable.Row style={{ flexDirection: 'row', height: 45, }}>
                        <View style={styles.left}>
                            <AppText style={styles.tablefont}>
                                No of Offline Bookings:
                            </AppText>
                        </View>
                        <View style={styles.right}>
                            <AppText style={styles.tablefont}>
                                {offlineBooking.length}
                            </AppText>
                        </View>
                    </DataTable.Row>
                    <DataTable.Row style={[tw`bg-gray-100`, { flexDirection: 'row', height: 45 }]}>
                        <View style={styles.left}>
                            <AppText style={styles.tablefont}>
                                Total Offline Business
                            </AppText>
                        </View>
                        <View style={styles.right}>
                            <AppText style={styles.tablefont}>
                                {totalOfflineBuisness}
                            </AppText>
                        </View>
                    </DataTable.Row>
                    <DataTable.Row style={{ flexDirection: 'row', height: 45, }}>
                        <View style={styles.left}>
                            <AppText style={styles.tablefont}>
                                Total Offline Discount provided:
                            </AppText>
                        </View>
                        <View style={styles.right}>
                            <AppText style={styles.tablefont}>
                                {totalOfflineDiscount}
                            </AppText>
                        </View>
                    </DataTable.Row>
                    <DataTable.Row style={[tw`bg-gray-100`, { flexDirection: 'row', height: 45 }]}>
                        <View style={styles.left}>
                            <AppText style={styles.tablefont}>
                                No of Online Bookings:
                            </AppText>
                        </View>
                        <View style={styles.right}>
                            <AppText style={styles.tablefont}>
                                {onlineBooking.length}
                            </AppText>
                        </View>
                    </DataTable.Row>
                    <DataTable.Row style={{ flexDirection: 'row', height: 45, }}>
                        <View style={styles.left}>
                            <AppText style={styles.tablefont}>
                                Total Online Business
                            </AppText>
                        </View>
                        <View style={styles.right}>
                            <AppText style={styles.tablefont}>
                                {totalOnlineBuisness}
                            </AppText>
                        </View>
                    </DataTable.Row>
                    <DataTable.Row style={[tw`bg-gray-100`, { flexDirection: 'row', height: 45 }]}>
                        <View style={styles.left}>
                            <AppText style={styles.tablefont}>
                                Total Online Discount provided:
                            </AppText>
                        </View>
                        <View style={styles.right}>
                            <AppText style={styles.tablefont}>
                                {totalOnlineDiscount}
                            </AppText>
                        </View>
                    </DataTable.Row>
                    <DataTable.Row style={{ flexDirection: 'row', height: 45, }}>
                        <View style={styles.left}>
                            <AppText style={styles.tablefont}>
                                Total Online Cancellation Business & (Count)
                            </AppText>
                        </View>
                        <View style={styles.right}>
                            <AppText style={styles.tablefont}>
                                {Math.round(cancelledBookingonline.map((ite: any) => _.get(ite, "totalAmountRecived")).reduce((p, c) => { return p + c }, 0))} ({cancelledBookingonline.length})
                            </AppText>
                        </View>
                    </DataTable.Row>
                    <DataTable.Row style={[tw`bg-gray-100`, { flexDirection: 'row', height: 45 }]}>
                        <View style={styles.left}>
                            <AppText style={styles.tablefont}>
                                Total Offline Cancellation Business & (Count)
                            </AppText>
                        </View>
                        <View style={styles.right}>
                            <AppText style={styles.tablefont}>
                                {Math.round(cancelledBookingoffline.map((ite: any) => _.get(ite, "totalAmountRecived")).reduce((p, c) => { return p + c }, 0))} ({cancelledBookingoffline.length})
                            </AppText>
                        </View>
                    </DataTable.Row>
                </DataTable>
            </ScrollScreen>
        </>
    );
};

const styles = StyleSheet.create({
    container: {},
    left: {
        width: '68%',
        justifyContent: 'center',
    },
    right: {
        width: '32%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    tablefont: { fontSize: 9.5 }
});

export default ReportsScreen;
