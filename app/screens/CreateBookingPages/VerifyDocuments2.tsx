import { BackHandler, Image, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Screen from '@/components/Screen'
import AppText from '@/components/AppText'
import tw from '@/lib/tailwind'
import _ from 'lodash'
import AppButton from '@/components/AppButton'
import routes from '@/navigation/routes';
import { useAppSelector } from '@/hooks/useAppSelector';
import CustomActivityIndicator from '@/components/CustomActivityIndicator';
import axios from 'axios';
import { apiPaths } from '@/api/apiPaths';
import ShowImageDialog from '@/components/ShowImageDialog';
import colors from '../../config/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
const VerifyDocuments2 = ({ navigation }: any) => {
    const { loading, rentBookingDetails, offlineBookingDetails,
        formdataforCheckIn } = useAppSelector((state) => state.entities.createBooking);

    const [screen, setscreen] = useState<string>("")
    const [formdata, setformdata] = useState({})
    const [showImage, setshowImage] = useState(false)
    BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.goBack()
        return true;
    }, [])
    useEffect(() => {
        setformdata(rentBookingDetails)
    }, [rentBookingDetails])
    const updatewebUserApiCall = async (userExist: string | null) => {
        try {
            const datas = {
                id: offlineBookingDetails._webuserId,
                address: _.get(formdataforCheckIn, "address"),
                userGstNo: _.get(formdataforCheckIn, "usergst"),
            }
            const config = {
                method: "post",
                url: `${apiPaths.prod.url}/api/webuser/updatedetails`,
                headers: {
                    Authorization: userExist !== null && JSON.parse(userExist)
                },
                data: datas,
            };
            const { data } = await axios(config);
            // console.log(data, "updatewebUserApiCall");
        } catch (error) {
            console.log(error);
        }
    };
    const rentBookingUpdate = async () => {
        const userExist = await AsyncStorage.getItem('@userExist')
        // setisLoading(true)
        const datas = {
            bookingId: _.get(offlineBookingDetails, "_id"),
            selectedBike: _.get(formdataforCheckIn, "selectVehicle.id"),
            startKm: _.get(formdataforCheckIn, "startingkm") || 0,
            isHelmateProvided: _.get(formdataforCheckIn, "helmet"),
        };
        const checkedData =
        {
            bookingId: _.get(offlineBookingDetails, "_id"),
            selectedBike: _.get(formdataforCheckIn, "selectVehicle.id"),
            startKm: _.get(formdataforCheckIn, "startingkm") || 0,
            isHelmateProvided: _.get(formdataforCheckIn, "helmet"),
            isModifiedBikes: _.get(formdataforCheckIn, "checked"),
            isWaveAmount: null,
            modifiedBikeBaseRent: _.get(offlineBookingDetails, "totalAmountRecived"),
            modifiedBikeReceviableAmount: _.get(offlineBookingDetails, "totalAmountRecived"),
            differenceAmount: 0,
            brand: _.get(formdataforCheckIn, "selectVehicle.brand"),
            model: _.get(formdataforCheckIn, "selectVehicle.vehicleModel"),
        }
        try {
            const config = {
                method: "post",
                url: `${apiPaths.prod.url}/api/rentbooking/update`,
                headers: {
                    Authorization: userExist !== null && JSON.parse(userExist)
                },
                data: _.get(formdataforCheckIn, "checked") ? checkedData : datas,
            };
            updatewebUserApiCall(userExist);
            const { data } = await axios(config);
            console.log(data, "Operation Complete");
            if (data) {
                ToastAndroid.show('Bike Successfully checkin', ToastAndroid.SHORT)
                navigation.replace(routes.DASHBOARD.route)
            }
        } catch (error) {
            console.log(error);
        }
    };
    const allDocumentsBoolean = Boolean(_.get(rentBookingDetails, 'checkInInfo.images.front') &&
        _.get(rentBookingDetails, 'checkInInfo.images.left') &&
        _.get(rentBookingDetails, 'checkInInfo.images.right')
        && _.get(rentBookingDetails, 'checkInInfo.images.back'))
    return (
        <>
            <CustomActivityIndicator visible={loading} />
            <ShowImageDialog
                screen={screen}
                type='' visible={showImage}
                setshowImage={setshowImage} />
            <Screen style={{ backgroundColor: 'white', alignItems: 'center', width: '100%', justifyContent: 'space-around' }}>
                <AppText style={tw`font-semibold`}>Complete Customer's/Rider e-KYC</AppText>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={{ ...styles.eachbox }} >
                        <MaterialCommunityIcons name="motorbike" size={24} color={colors.purple} />
                        <View style={[tw`self-center`]}>
                            <AppText style={tw`text-xs self-center`}>Step 3</AppText>
                            <AppText style={tw`font-bold text-sm`}>Vehicle Photos</AppText>
                        </View>
                        {
                            allDocumentsBoolean ?
                                <TouchableOpacity onPress={() => {
                                    setshowImage(true)
                                    setscreen("vehiclephotos")
                                }}>
                                    <Image source={{ uri: _.get(formdata, 'checkInInfo.images.front') }} style={{ width: 20, height: 20 }} />
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => navigation.navigate(routes.VEHICLE_PHOTOS_SCREEN.route)}>
                                    <MaterialCommunityIcons name="camera" size={24} color={colors.purple} />
                                </TouchableOpacity>
                        }
                    </View>
                    <View style={{ ...styles.eachbox }} >
                        <MaterialCommunityIcons name="account-box" size={24} color={colors.purple} />
                        <View style={[tw`self-center`]}>
                            <AppText style={tw`text-xs self-center`}>Step 4</AppText>
                            <AppText style={tw`font-bold text-sm`}>Customer photo with bike</AppText>
                        </View>
                        {
                            _.get(formdata, 'checkInInfo.images.selfieWithBike') ?
                                <TouchableOpacity onPress={() => {
                                    setshowImage(true)
                                    setscreen("customerdetails")
                                }}>
                                    <Image source={{ uri: _.get(formdata, 'checkInInfo.images.selfieWithBike') }} style={{ width: 20, height: 20 }} />
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => navigation.navigate(routes.CUSTOMERS_DETAILS_SCREEN.route)}>
                                    <MaterialCommunityIcons name="camera" size={24} color={colors.purple} />
                                </TouchableOpacity>
                        }
                    </View>
                </View>
                <AppButton disabled={Boolean(!allDocumentsBoolean)} style={tw`h-13 w-9/10 rounded-lg`} title='Proceed' onPress={() => rentBookingUpdate()} />
            </Screen>
        </>
    )
}

export default VerifyDocuments2

const styles = StyleSheet.create({
    eachbox: {
        height: 60, elevation: 3,
        width: '90%',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 12,
        flexDirection: 'row',
        paddingHorizontal: 15
    }
})