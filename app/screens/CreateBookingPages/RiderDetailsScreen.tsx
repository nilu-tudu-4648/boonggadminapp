import tw from "@/lib/tailwind";
import React, { useEffect, useRef, useState } from 'react'
import {
  BackHandler, Image, ImageBackground, ScrollView, StyleSheet,
  TextInput, ToastAndroid, TouchableOpacity, View
} from 'react-native'
import { Feather } from '@expo/vector-icons';
import AppText from '@/components/AppText'
import AppButton from '@/components/AppButton'
import { SIZES } from '../../config/styles';
import { getsinglerentbooking, updateRentBooking } from "@/store/createBooking";
import { useDispatch } from "react-redux";
import PhoneInput from 'react-native-phone-number-input';
import axios from "axios";
import { useAppSelector } from "@/hooks/useAppSelector";
import ScrollScreen from "@/components/ScrollScreen";
import { apiPaths } from "@/api/apiPaths";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";

import * as ImagePicker from 'expo-image-picker'

import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

import * as FileSystem from 'expo-file-system';
import { convertBytesToMB } from "@/components/constants/functions";

export default function RiderDetailsScreen({ navigation }: any) {
  const { offlineBookingDetails, userToken } = useAppSelector((state) =>
    state.entities.createBooking);
  const [startCamera, setStartCamera] = useState(true)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [customersDetails, setcustomersDetails] = useState({
    emergencyNo: '',
    emergencyAddress: ''
  })
  const [capturedImage, setCapturedImage] = useState<any>(null)
  const [visible, setvisible] = useState(false)
  const phoneInput = useRef<PhoneInput>(null);
  const [valid, setValid] = useState(false);
  const [disabled, setdisabled] = useState<boolean>(false)
  const submit = async (capturedImage, fn) => {
    try {
      setvisible(true)
      dispatch(updateRentBooking(Body))
      const Imagedata = new FormData();
      Imagedata.append('bikeimages', {
        uri: capturedImage,
        type: `image/jpeg`,
        name: 'name'
      });
      const url = `${apiPaths.prod.url}/api/rentbooking/uploadBikeImages/${offlineBookingDetails._id}/selfieWithBike`
      const { data } = await axios.post(url, Imagedata, {
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
        setStartCamera(false)
        if (fn) fn()
      }
    } catch (error) {
      submita(capturedImage, fn)
      console.log(error)
    }
  }
  const submita = async (capturedImage, fn) => {
    try {
      setvisible(true)
      dispatch(updateRentBooking(Body))
      const Imagedata = new FormData();
      Imagedata.append('bikeimages', {
        uri: capturedImage,
        type: `image/jpeg`,
        name: 'name'
      });
      const url = `${apiPaths.prod.url}/api/rentbooking/uploadBikeImages/${offlineBookingDetails._id}/selfieWithBike`
      const { data } = await axios.post(url, Imagedata, {
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
        setStartCamera(false)
        if (fn) fn()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const dispatch = useDispatch()
  const Body = {
    id: offlineBookingDetails._id,
    checkInInfo: {
      emergencyAddress: customersDetails.emergencyAddress,
      emergencyNo: customersDetails.emergencyNo
    }
  }
  BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.goBack()
    return true;
  }, [])
  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
  }
  const takeImage = async () => {
    try {
      const image: any = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.1,
      })
      const manipResult = await manipulateAsync(
        image.assets[0].uri,
        [{ rotate: 0 }, {
          resize: {
            width: 800
          }
        }],
        { compress: .2, format: SaveFormat.PNG }
      );
      const fileInfo = await FileSystem.getInfoAsync(manipResult.uri);
      setCapturedImage(manipResult.uri)
      setPreviewVisible(true)
      try {
        const fileSizeInMB = convertBytesToMB(fileInfo.size);
        console.log(fileSizeInMB);
        if (fileSizeInMB > 2) return setdisabled(true)
        setdisabled(false)
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.log(error)
      ToastAndroid.show('Image upload failed', ToastAndroid.SHORT)
    }
  }
  return (
    <ScrollScreen style={{ flex: 1, backgroundColor: 'white' }}>
      {/* topbox */}
      <CustomActivityIndicator visible={visible} />
      <AppText style={tw`my-2 font-semibold self-center text-base`}>{`Customer's Selfie`} </AppText>
      <View style={{ flex: 1, alignItems: 'center' }}>
        {startCamera ? (
          <View
            style={{
              flex: 1,
              width: SIZES.width * .9,
              height: SIZES.width,
            }}
          >
            {previewVisible && capturedImage ? (
              <CameraPreview photo={capturedImage} retakePicture={__retakePicture} />
            ) :
              <TouchableOpacity onPress={takeImage} style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
                {/* <MaterialCommunityIcons name="camera" size={74} color={'gray'} /> */}
              </TouchableOpacity>
            }
          </View>
        ) :
          <Image source={{ uri: capturedImage }} style={{
            flex: 1,
            width: SIZES.width * .9,
            height: SIZES.width,
          }} />
        }
      </View>
      {/* bottombox */}
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={takeImage}
          // disabled={Boolean(previewVisible)}
          style={{
            width: 60,
            height: 60,
            top: -40,
            borderRadius: 30,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            elevation: 4,
            position: 'absolute'
          }}
        >
          <Feather name="camera" size={40} color={'#17A1FA'} />
        </TouchableOpacity>
        <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={{ top: 22, backgroundColor: 'white', justifyContent: 'space-between', width: SIZES.width * .9, alignSelf: 'center' }}>
          <AppText style={tw`my-2 font-semibold text-base`}>We need few more details</AppText>
          <View>
            <AppText style={[tw`my-2 text-xs my-1`, { color: '#B9B9B9' }]}>Emergency Contact No</AppText>
            <PhoneInput
              ref={phoneInput}
              containerStyle={[tw`w-full rounded h-13 border-b-2 border-gray-200`, { elevation: 0 }]}
              textContainerStyle={[tw`bg-white`]}
              defaultValue={customersDetails.emergencyNo}
              defaultCode="IN"
              textInputStyle={{ fontSize: 12 }}
              codeTextStyle={{ fontSize: 12, }}
              flagButtonStyle={{ width: '19%' }}
              layout="first"
              onChangeText={(text) => {
                setcustomersDetails({ ...customersDetails, emergencyNo: text });
              }}
              onChangeFormattedText={(text) => {
                const checkValid = phoneInput.current?.isValidNumber(text);
                setValid(checkValid ? checkValid : false);
              }}
              countryPickerProps={{ withAlphaFilter: true }}
              withShadow
              textInputProps={{
                maxLength: 10,
                placeholder: ""
              }}
            />
            {
              !valid && customersDetails.emergencyNo.length > 0 &&
              <AppText style={{ color: 'red', fontSize: 12, top: 1 }}>Please enter valid Phone Number</AppText>
            }
          </View>
          <View>
            <AppText style={[tw`my-2 text-xs my-1`, { color: '#B9B9B9' }]}>Emergency Address</AppText>
            <TextInput value={customersDetails.emergencyAddress} onChangeText={(t) => setcustomersDetails({ ...customersDetails, emergencyAddress: t })} style={[tw`h-12 rounded p-2 border-b-2 border-gray-200`, {
            }]} />
          </View>
          <AppButton style={tw`h-13 rounded-lg`} disabled={disabled ? disabled : Boolean(!capturedImage)} title={'Save'} onPress={() => {
            submit(capturedImage, navigation.goBack());
          }} />
        </ScrollView>
      </View>
    </ScrollScreen>
  )
}


const CameraPreview = ({ photo }: any) => {
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
      </ImageBackground>
    </View>
  )
}

