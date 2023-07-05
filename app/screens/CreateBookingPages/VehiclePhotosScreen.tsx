import tw from "@/lib/tailwind";
import React, { useEffect, useState } from 'react'
import {
    BackHandler, Image, ImageBackground, ScrollView,
    StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View
} from 'react-native'
import { Camera, CameraType, FlashMode } from 'expo-camera'
import { Entypo, Ionicons } from '@expo/vector-icons';
import AppText from '@/components/AppText'
import AppButton from '@/components/AppButton'
import colors from '../../config/colors'
import _ from 'lodash'
import { SIZES } from '../../config/styles';
import routes from "@/navigation/routes";
import { getsinglerentbooking, updateRentBooking } from "@/store/createBooking";
import { useDispatch } from "react-redux";
import { Picker as SelectPicker } from "@react-native-picker/picker";
import { useAppSelector } from "@/hooks/useAppSelector";
import axios from "axios";
import { apiPaths } from "@/api/apiPaths";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { convertBytesToMB } from "@/components/constants/functions";
let camera: Camera
export default function VehiclePhotosScreen({ navigation }: any) {
    const { offlineBookingDetails, rentBookingDetails, userToken, loading } =
        useAppSelector((state) => state.entities.createBooking);
    const [vehicleDetails, setvehicleDetails] = React.useState<any>({
        odometer: '',
    })
    const DocumentsAvailable = Boolean(_.get(rentBookingDetails, 'checkInInfo.images.back') &&
        _.get(rentBookingDetails, 'checkInInfo.images.front') && _.get(rentBookingDetails, 'checkInInfo.images.right') && _.get(rentBookingDetails, 'checkInInfo.images.left') && vehicleDetails.odometer)
    const [startCamera, setStartCamera] = useState(false)
    const [formdata, setformdata] = useState({})
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState<any>(null)
    const [disabled, setdisabled] = useState<boolean>(false)
    const [visible, setvisible] = useState(false)
    const __startCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
            setStartCamera(true)
        } else {
            ToastAndroid.show('Access denied', ToastAndroid.SHORT)
        }
    }
    useEffect(() => {
        setformdata(rentBookingDetails)
    }, [rentBookingDetails])
    const __takePicture = async (capturedImageValue) => {
        try {
            const image: any = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.1,
            })
            if (!image.canceled) {
                const manipResult = await manipulateAsync(
                    image.assets[0].uri,
                    [{ rotate: 0 }, {
                        resize: {
                            width: 800
                        }
                    }],
                    { compress: .2, format: SaveFormat.PNG }
                );
                const arr = await FileSystem.getInfoAsync(manipResult.uri);
                setCapturedImage(manipResult.uri)
                setPreviewVisible(true)
                try {
                    const fileSizeInMB = convertBytesToMB(arr.size);
                    console.log(fileSizeInMB);
                    if (fileSizeInMB > 2) return setdisabled(true)
                    setdisabled(false)
                    __savePhoto(manipResult.uri, capturedImageValue)
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    const goBackFunc = () => {
        if (startCamera) {
            setStartCamera(false)
        } else {
            navigation.goBack()
        }
    }
    BackHandler.addEventListener('hardwareBackPress', () => {
        goBackFunc()
        return true;
    }, [])
    const dispatch = useDispatch()
    const __savePhoto = async (img, capturedImageValue) => {
        setvisible(true)
        // const img = capturedImage
        const name = 'name'
        const Imagedata = new FormData();
        const fileType = 'jpeg'
        Imagedata.append('bikeimages', {
            uri: img,
            type: `image/${fileType}`,
            name
        });
        console.log({ capturedImageValue })
        const url = `${apiPaths.prod.url}/api/rentbooking/uploadBikeImages/${offlineBookingDetails._id}/${capturedImageValue.toLocaleLowerCase()}`
        try {
            const data = await axios.post(url, Imagedata, {
                headers: {
                    'Authorization': userToken,
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (data) {
                setvisible(false)
                dispatch(getsinglerentbooking(offlineBookingDetails._id))
                ToastAndroid.show('Image uploaded successfully', ToastAndroid.SHORT)
                setPreviewVisible(false)
            }
        } catch (error) {
            __savePhotoa(img, capturedImageValue)
            // setvisible(false)
            console.log(error)
            setPreviewVisible(false)
            // ToastAndroid.show('Image upload failed try again', ToastAndroid.SHORT)
        }
        setStartCamera(false)
    }
    const __savePhotoa = async (img, capturedImageValue) => {
        setvisible(true)
        // const img = capturedImage
        const name = 'name'
        const Imagedata = new FormData();
        const fileType = 'jpeg'
        Imagedata.append('bikeimages', {
            uri: img,
            type: `image/${fileType}`,
            name
        });

        const url = `${apiPaths.prod.url}/api/rentbooking/uploadBikeImages/${offlineBookingDetails._id}/${capturedImageValue.toLocaleLowerCase()}`
        try {
            const data = await axios.post(url, Imagedata, {
                headers: {
                    'Authorization': userToken,
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (data) {
                setvisible(false)
                dispatch(getsinglerentbooking(offlineBookingDetails._id))
                ToastAndroid.show('Image uploaded successfully', ToastAndroid.SHORT)
                setPreviewVisible(false)
            }
        } catch (error) {
            setvisible(false)
            console.log(error)
            setPreviewVisible(false)
            ToastAndroid.show('Image upload failed try again', ToastAndroid.SHORT)
        }
        setStartCamera(false)
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <CustomActivityIndicator visible={visible || loading} />
            {startCamera ?
                <View />
                : (
                    <ScrollView contentContainerStyle={{ padding: 1, alignItems: 'center' }}>
                        {/* topbox */}
                        <View style={{ width: '100%', flexDirection: 'row', padding: 15, alignItems: 'center', justifyContent: 'space-between', height: 90, top: 8 }}>
                            <Ionicons name="arrow-back" size={30} color="black" onPress={() => navigation.goBack()} />
                            <AppText style={[tw`font-semibold text-lg`]}>Boongg</AppText>
                            <View style={{ width: 25, height: 25 }} />
                        </View>
                        <>
                            <Text style={tw`mb-2 font-semibold self-start ml-5 text-lg`}>Vehicle <Text style={{ color: colors.lightblue }}>Photos</Text></Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%' }}>
                                <TouchableOpacity onPress={() => {

                                    __takePicture('Front')
                                }} style={styles.cameraboxsmall}>
                                    {
                                        !_.get(formdata, 'checkInInfo.images.front') ?
                                            <>
                                                <AppText style={{ color: '#000000', fontSize: 9 }}>Front</AppText>
                                                <Entypo name="camera" size={SIZES.width / 12} color={colors.lightblue} />
                                                <AppText style={{ color: '#000000', top: 12, fontSize: 9 }}>Allow camera to scan</AppText>
                                                <AppText style={{ color: '#000000', fontSize: 9 }}>your details</AppText>
                                            </> : <Image source={{ uri: _.get(formdata, 'checkInInfo.images.front') }} style={{ width: 100, height: 100 }} />
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {

                                    __takePicture('Back')
                                }} style={styles.cameraboxsmall}>
                                    {
                                        !_.get(formdata, 'checkInInfo.images.back') ?
                                            <>
                                                <AppText style={{ color: '#000000', fontSize: 9 }}>Back</AppText>
                                                <Entypo name="camera" size={SIZES.width / 12} color={colors.lightblue} />
                                                <AppText style={{ color: '#000000', top: 12, fontSize: 9 }}>Allow camera to scan</AppText>
                                                <AppText style={{ color: '#000000', fontSize: 9 }}>your details</AppText>
                                            </> : <Image source={{ uri: _.get(formdata, 'checkInInfo.images.back') }} style={{ width: 100, height: 100 }} />
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '90%', marginTop: 8 }}>
                                <TouchableOpacity onPress={() => {

                                    __takePicture('Left')
                                }} style={styles.cameraboxsmall}>
                                    {
                                        !_.get(formdata, 'checkInInfo.images.left') ?
                                            <>
                                                <AppText style={{ color: '#000000', fontSize: 9 }}>Left</AppText>
                                                <Entypo name="camera" size={SIZES.width / 12} color={colors.lightblue} />
                                                <AppText style={{ color: '#000000', top: 12, fontSize: 9 }}>Allow camera to scan</AppText>
                                                <AppText style={{ color: '#000000', fontSize: 9 }}>your details</AppText>
                                            </> : <Image source={{ uri: _.get(formdata, 'checkInInfo.images.left') }} style={{ width: 100, height: 100 }} />
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {

                                    __takePicture('Right')
                                }} style={styles.cameraboxsmall}>
                                    {
                                        !_.get(formdata, 'checkInInfo.images.right') ?
                                            <>
                                                <AppText style={{ color: '#000000', fontSize: 9 }}>Right</AppText>
                                                <Entypo name="camera" size={SIZES.width / 12} color={colors.lightblue} />
                                                <AppText style={{ color: '#000000', top: 12, fontSize: 9 }}>Allow camera to scan</AppText>
                                                <AppText style={{ color: '#000000', fontSize: 9 }}>your details</AppText>
                                            </> : <Image source={{ uri: _.get(formdata, 'checkInInfo.images.right') }} style={{ width: 100, height: 100 }} />
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={tw`w-9/10 my-1 mt-5`}>
                                <AppText style={[tw`text-xs my-1`, { color: '#B9B9B9' }]}>Odometer Reading</AppText>
                                <TextInput keyboardType='number-pad' value={vehicleDetails.odometer}
                                    onChangeText={(t) => setvehicleDetails({ ...vehicleDetails, odometer: t })}
                                    style={[tw`h-12 rounded p-2 border-b-2 border-gray-200`, {
                                        fontSize: 11
                                    }]} />
                            </View>
                        </>
                    </ScrollView>
                )}
            {
                !startCamera &&
                <AppButton disabled={disabled ? disabled : !DocumentsAvailable} title='Save' style={tw`w-9/10 h-13 self-center`} onPress={() => {
                    dispatch(updateRentBooking({
                        id: offlineBookingDetails._id,
                        checkInInfo: {
                            odometer: vehicleDetails.odometer,
                        }
                    }))
                    setTimeout(() => {
                        dispatch(getsinglerentbooking(offlineBookingDetails._id))
                    }, 1000);
                    navigation.replace(routes.VERIFY_DOCUMENTS_SCREEN2.route)
                }} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cameraboxsmall: {
        width: SIZES.width * .43,
        height: SIZES.width * .3,
        backgroundColor: '#F1F7FF',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: colors.lightblue,
        borderWidth: 2, borderStyle: 'dotted'
    }, cameraBox: {
        flex: .8, width: SIZES.width * .87,
        height: SIZES.width * .62,
        backgroundColor: '#F1F7FF',
        justifyContent: 'center',
        alignItems: 'center', alignSelf: 'center',
        borderColor: '#17A1FA', borderWidth: 2,
        borderStyle: 'dotted'
    }
})
const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {
    return (
        <View
            style={{
                backgroundColor: 'transparent',
                flex: 1,
                width: '100%',
                height: '100%'
            }}
        >
            <ImageBackground
                source={{ uri: photo }}
                style={{
                    flex: 1
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        padding: 15,
                        justifyContent: 'flex-end'
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                    >
                        <TouchableOpacity
                            onPress={retakePicture}
                            style={{
                                width: 130,
                                height: 40,

                                alignItems: 'center',
                                borderRadius: 4
                            }}
                        >
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 20
                                }}
                            >
                                Re-take
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={savePhoto}
                            style={{
                                width: 130,
                                height: 40,

                                alignItems: 'center',
                                borderRadius: 4
                            }}
                        >
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 20
                                }}
                            >
                                save photo
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
