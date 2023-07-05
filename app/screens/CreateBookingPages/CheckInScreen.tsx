import { StyleSheet, View, ScrollView, ToastAndroid, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Checkbox, TextInput } from 'react-native-paper';
import tw from "@/lib/tailwind";
import { Picker as SelectPicker } from "@react-native-picker/picker";
import AppText from "../../components/AppText";
import axios from 'axios';
import _ from "lodash";
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/useAppSelector';
import colors from '../../config/colors';
import { fetchBikestocreateBookings, formdataforCheckInData, getsinglerentbooking, updateRentBooking, } from '@/store/createBooking';
import routes from '@/navigation/routes';
import ActivityIndicator from '@/components/CustomActivityIndicator';
import AppButton from '@/components/AppButton';
import { apiPaths } from '@/api/apiPaths';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface AssignBikeDialogProps {
    navigation: any
}
const CheckInScreen: React.FC<AssignBikeDialogProps> = ({ navigation }) => {
    const [formdata, setformdata] = React.useState({
        address: "",
        usergst: "",
        startingkm: "",
        helmet: false,
    });
    const { storeName } = useAppSelector((state: any) => state.entities.searchBikes);
    // const [formdata, setformdata] = React.useState({
    //     address: "f",
    //     usergst: "f",
    //     startingkm: "f",
    //     helmet: false,
    // });
    const { rentpoolList, allfetchBikes, loading, offlineBookingDetails, formdataforCheckIn } =
        useAppSelector((state) => state.entities.createBooking);
    const [selectVehicle, setSelectedVehicle] = useState<any>({});
    const [isFocus, setIsFocus] = useState(false);
    const [value2, setValue2] = useState(null);
    const allField = Boolean(formdata?.address && formdata?.startingkm && selectVehicle);
    const dispatch = useDispatch()
    const updatewebUserApiCall = async () => {
        const userExist = await AsyncStorage.getItem('@userExist')
        try {
            const datas = {
                id: offlineBookingDetails._webuserId,
                address: formdata.address,
                userGstNo: formdata.usergst,
            };
            const config = {
                method: "post",
                url: `${apiPaths.prod.url}/api/webuser/updatedetails`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: userExist !== null && JSON.parse(userExist)
                },
                data: datas,
            };
            const { data } = await axios(config);
            console.log(data, "updatewebUserApiCall");
        } catch (error) {
            console.log(error);
        }
    };
    BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.goBack()
        return true;
    }, [])
    const onPress = () => {
        updatewebUserApiCall()
        dispatch(updateRentBooking({
            id: offlineBookingDetails._id,
            checkInInfo: {
                registrationNo: selectVehicle,
            }
        }))
        dispatch(getsinglerentbooking(offlineBookingDetails._id))
        navigation.navigate(routes.VERIFY_DOCUMENTS_SCREEN1.route)
    }
    const [filterandlabeled, setfilterandlabeled] = useState<any[]>([]);
    const [withoutcheckedfilterandlabeled, setwithoutcheckedfilterandlabeled] = useState<any[]>([]);
    useEffect(() => {
        if (rentpoolList) {
            setfilterandlabeled(rentpoolList.map((ite) => (
                { label: ite.registrationNumber + " " + `(${ite.brand}` + " " + `${ite.vehicleModel})`, value: ite.registrationNumber + " " + `${ite.brand}` + " " + `${ite.vehicleModel}` }
            )))
            setwithoutcheckedfilterandlabeled(rentpoolList.filter(item => item.brand === offlineBookingDetails.brand && item.vehicleModel === offlineBookingDetails.model).map((ite) => (
                { label: ite.registrationNumber + " " + `(${ite.brand}` + " " + `${ite.vehicleModel})`, value: ite.registrationNumber + " " + `${ite.brand}` + " " + `${ite.vehicleModel}` }
            )))
        }
    }, [offlineBookingDetails])
    return (
        <>
            <ActivityIndicator visible={loading} />
            <View
                style={[tw`bg-white p-3`, { flex: 1 }]}>
                <ScrollView contentContainerStyle={tw`w-full bg-white`} keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false}>
                    {
                        offlineBookingDetails &&
                        <AppText style={[tw`my-1 rounded bg-gray-200 p-1`, { fontSize: 12 }]}>
                            {`Booking for :${_.get(offlineBookingDetails, 'brand') + " " + _.get(offlineBookingDetails, 'model') + " "}${_.get(offlineBookingDetails, '_rentBikeKey.engineCapacity') ? _.get(offlineBookingDetails, '_rentBikeKey.engineCapacity') + " CC" : ""}`}
                        </AppText>
                    }
                    <AppText style={[tw`text-sm`, { fontSize: 12 }]}>Check to Modify Booking</AppText>
                    <View style={tw`flex-row items-center border-gray-200 border-2 my-2`}>
                        <Checkbox
                            status={formdataforCheckIn.checked ? "checked" : "unchecked"}
                            onPress={() => {
                                dispatch(formdataforCheckInData({ ...formdataforCheckIn, checked: !formdataforCheckIn.checked }))
                            }}
                            color={colors.purple}
                        />
                        <View style={tw`flex-shrink`}>
                            <AppText style={[tw`text-sm`, { fontSize: 12 }]}>Modify Bikes</AppText>
                        </View>
                    </View>
                    <AppText style={[tw`text-sm my-1`, { fontSize: 12 }]}>Select Bike for Booking</AppText>
                    {
                        formdataforCheckIn.checked ?
                            <Dropdown
                                style={[tw`w-full bg-gray-100`, styles.dropdown]}
                                placeholderStyle={tw`text-xs`}
                                itemTextStyle={tw`text-xs`}
                                selectedTextStyle={[tw`text-xs`, styles.selectedTextStyle]}
                                backgroundColor={`rgba(0,0,0,0.4)`}
                                inputSearchStyle={[tw`text-xs`, styles.inputSearchStyle]}
                                data={filterandlabeled}
                                search
                                maxHeight={(filterandlabeled.length + 1) * 40 || 50}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Select Bike' : '...'}
                                searchPlaceholder="Search..."
                                value={value2}
                                onBlur={() => {
                                    setIsFocus(false)
                                }}
                                onChange={item => {
                                    setValue2(item.value);
                                    const modelName = _.get(item, 'value').split(' ')[3] ?
                                        _.get(item, 'value').split(' ')[2] + " " + _.get(item, 'value').split(' ')[3]
                                        : _.get(item, 'value').split(' ')[2]
                                    setSelectedVehicle(_.get(item, 'value').split(' ')[0])
                                    const itemValue = rentpoolList.filter((ite => ite.registrationNumber === _.get(item, 'value').split(' ')[0]))[0]
                                    dispatch(formdataforCheckInData({ ...formdataforCheckIn, selectVehicle: itemValue }))
                                    dispatch(
                                        fetchBikestocreateBookings({
                                            startDate: Date.parse(offlineBookingDetails?.startDate),
                                            endDate: Date.parse(offlineBookingDetails?.endDate),
                                            Bikemodel: {
                                                brand: _.get(item, 'value').split(' ')[1],
                                                modelName
                                            },
                                            storeName
                                        })
                                    )
                                }}
                            />
                            :
                            <Dropdown
                                style={[tw`w-full bg-gray-100`, styles.dropdown]}
                                placeholderStyle={tw`text-xs`}
                                itemTextStyle={tw`text-xs`}
                                selectedTextStyle={[tw`text-xs`, styles.selectedTextStyle]}
                                backgroundColor={`rgba(0,0,0,0.4)`}
                                inputSearchStyle={[tw`text-xs`, styles.inputSearchStyle]}
                                data={withoutcheckedfilterandlabeled}
                                search
                                maxHeight={(withoutcheckedfilterandlabeled.length + 1) * 50 || 50}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Select Bike' : '...'}
                                searchPlaceholder="Search..."
                                value={value2}
                                onBlur={() => {
                                    setIsFocus(false)
                                }}
                                onChange={item => {
                                    setValue2(item.value);
                                    const modelName = _.get(item, 'value').split(' ')[3] ?
                                        _.get(item, 'value').split(' ')[2] + " " + _.get(item, 'value').split(' ')[3]
                                        : _.get(item, 'value').split(' ')[2]
                                    setSelectedVehicle(_.get(item, 'value').split(' ')[0])
                                    const itemValue = rentpoolList.filter((ite => ite.registrationNumber === _.get(item, 'value').split(' ')[0]))[0]
                                    dispatch(formdataforCheckInData({ ...formdataforCheckIn, selectVehicle: itemValue }))
                                    dispatch(
                                        fetchBikestocreateBookings({
                                            startDate: Date.parse(offlineBookingDetails?.startDate),
                                            endDate: Date.parse(offlineBookingDetails?.endDate),
                                            Bikemodel: {
                                                brand: item.value.split(' ')[1],
                                                modelName
                                            },
                                            storeName
                                        })
                                    )
                                }}
                            />

                    }
                    <View style={tw`my-1`} >
                        <TextInput
                            label={
                                <AppText style={tw`text-xs`}>Address</AppText>
                            }
                            value={formdata.address}
                            onChangeText={(text) => {
                                setformdata({ ...formdata, address: text })
                                dispatch(formdataforCheckInData({ ...formdataforCheckIn, address: text }))
                            }
                            }
                            style={tw`text-xs  bg-white h-12`}
                        />
                    </View>
                    <View style={tw`my-1`}  >
                        <TextInput
                            label={
                                <AppText style={tw`text-xs`}>User GST No</AppText>
                            }
                            value={formdata.usergst}
                            onChangeText={(text) => {
                                setformdata({ ...formdata, usergst: text })
                                dispatch(formdataforCheckInData({ ...formdataforCheckIn, usergst: text }))
                            }
                            }
                            style={tw`text-xs  bg-white h-12`}
                        />
                    </View>
                    <View style={tw`my-1`}  >
                        <TextInput
                            label={
                                <AppText style={tw`text-xs`}>Starting Km</AppText>
                            }
                            keyboardType='numeric'
                            value={formdata.startingkm}
                            onChangeText={(text) => {
                                setformdata({ ...formdata, startingkm: text })
                                dispatch(formdataforCheckInData({ ...formdataforCheckIn, startingkm: text }))
                            }
                            }
                            style={tw`text-xs bg-white h-12`}
                        />
                    </View>
                    <View
                        style={tw`flex-row items-center border-gray-200 border-2 my-2`}>
                        <Checkbox
                            status={formdata.helmet ? "checked" : "unchecked"}
                            onPress={() => {
                                dispatch(formdataforCheckInData({ ...formdataforCheckIn, helmet: !formdataforCheckIn.helmet }))
                                setformdata({ ...formdata, helmet: !formdata.helmet });
                            }}
                            color={colors.purple}
                        />
                        <View style={tw`flex-shrink`}>
                            <AppText style={[tw`text-sm`, { fontSize: 12 }]}>
                                Please check if Helmet provided
                            </AppText>
                        </View>
                    </View>
                    {
                        formdataforCheckIn.checked && allfetchBikes.length === 0 &&
                        <AppText style={[tw`text-sm bg-red-200 p-1`, { fontSize: 12 }]}>No Data Available for your search....!</AppText>
                    }
                    <AppButton title='Check-In' disabled={formdataforCheckIn.checked ? Boolean(allfetchBikes.length === 0) : allField ? false : true} onPress={() => onPress()} />
                    {/* <AppButton title='Manual Check-In' disabled={formdataforCheckIn.checked ? Boolean(allfetchBikes.length === 0) : allField ? false : true} onPress={rentBookingUpdate} /> */}
                </ScrollView>
            </View>
        </>
    )
}

export default CheckInScreen

const styles = StyleSheet.create({
    dropdown: {
        height: 43,
        borderRadius: 4,
        paddingHorizontal: 8,

    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,

    },
    selectedTextStyle: {
        color: 'black'
    },
    inputSearchStyle: {
        height: 40,
    },
})