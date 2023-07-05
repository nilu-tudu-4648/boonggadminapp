import tw from "@/lib/tailwind";
import React, { useEffect, useState } from 'react'
import {
  Image, ImageBackground, ScrollView,
  TextInput, ToastAndroid, TouchableOpacity, View
} from 'react-native'
import { Feather } from '@expo/vector-icons';
import AppText from '@/components/AppText'
import AppButton from '@/components/AppButton'
import { SIZES } from '../../config/styles';
import { getsinglerentbooking, getUserbyMobileNo, } from "@/store/createBooking";
import { useDispatch } from "react-redux";

import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { useAppSelector } from "@/hooks/useAppSelector";
import { apiPaths } from "@/api/apiPaths";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import colors from "../../config/colors";
import * as FileSystem from 'expo-file-system';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { convertBytesToMB } from "@/components/constants/functions";
export default function OpenCameraManuallyInput({ navigation, route }: any) {
  const { UserbyMobileNo, offlineBookingDetails, userToken } =
    useAppSelector((state) => state.entities.createBooking);
  const { type, screen, title } = route.params
  const [startCamera, setStartCamera] = useState<boolean>(true)
  const [visible, setvisible] = useState<boolean>(false)
  const [disabled, setdisabled] = useState<boolean>(true)
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)
  const [onchangetext, setonchangetext] = useState<string>('')
  const [address, setaddress] = useState<string>('')
  const [capturedImage, setCapturedImage] = useState<any>(null)
  const takeImage = async () => {
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
          __savePhoto(manipResult.uri)
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const dispatch = useDispatch()
  const __savePhoto = async (capturedImage) => {
    setvisible(true)
    const name = 'name'
    const Imagedata = new FormData();
    const fileType = 'jpeg'
    if (screen === 'differentuser') {
      Imagedata.append('bikeimages', {
        uri: capturedImage,
        type: `image/${fileType}`,
        name
      });
      //change the url 
      const url2 = `${apiPaths.prod.url}/api/rentbooking/uploadBikeImages/${offlineBookingDetails._id}/${type}`
      try {
        const { data } = await axios.post(url2, Imagedata, {
          headers: {
            'Authorization': userToken,
            'Content-Type': 'multipart/form-data'
          }
        })
        // console.log(data, 'differentuser')
        if (data) {
          setvisible(false)
          dispatch(getsinglerentbooking(offlineBookingDetails._id))
          ToastAndroid.show("Image uploaded succesfully", ToastAndroid.SHORT)
          setPreviewVisible(false)
          setStartCamera(false)
          navigation.goBack()
        }
      } catch (error) {
        onceGain(capturedImage)
        console.log(error)
      }
    } else {
      Imagedata.append("image", {
        uri: capturedImage,
        type: `image/${fileType}`,
        name
      });
      //change the url 
      const url = `${apiPaths.prod.url}/api/webuser/${UserbyMobileNo[0]._id}/${type}`
      try {
        const { data } = await axios.post(url, Imagedata, {
          headers: {
            'Authorization': userToken,
            'Content-Type': 'multipart/form-data'
          }
        })
        // console.log(data, url, 'rest')
        if (data) {
          setvisible(false)
          dispatch(getUserbyMobileNo(UserbyMobileNo[0].profile?.mobileNumber))
          ToastAndroid.show("Image uploaded succesfully", ToastAndroid.SHORT)
          setPreviewVisible(false)
          setStartCamera(false)
          navigation.goBack()
        }
      } catch (error) {
        console.log(error)
        onceGain(capturedImage)
      }
    }
  }

  const onceGain = async (capturedImage) => {
    setvisible(true)
    const name = 'name'
    const Imagedata = new FormData();
    const fileType = 'jpeg'
    if (screen === 'differentuser') {
      Imagedata.append('bikeimages', {
        uri: capturedImage,
        type: `image/${fileType}`,
        name
      });
      //change the url 
      const url2 = `${apiPaths.prod.url}/api/rentbooking/uploadBikeImages/${offlineBookingDetails._id}/${type}`
      try {
        const { data } = await axios.post(url2, Imagedata, {
          headers: {
            'Authorization': userToken,
            'Content-Type': 'multipart/form-data'
          }
        })
        // console.log(data, 'differentuser')
        if (data) {
          setvisible(false)
          dispatch(getsinglerentbooking(offlineBookingDetails._id))
          ToastAndroid.show("Image uploaded succesfully", ToastAndroid.SHORT)
          setPreviewVisible(false)
          setStartCamera(false)
          navigation.goBack()
        }
      } catch (error) {
        console.log(error)
        setvisible(false)
      }
    } else {
      Imagedata.append("image", {
        uri: capturedImage,
        type: `image/${fileType}`,
        name
      });
      //change the url 
      const url = `${apiPaths.prod.url}/api/webuser/${UserbyMobileNo[0]._id}/${type}`
      try {
        const { data } = await axios.post(url, Imagedata, {
          headers: {
            'Authorization': userToken,
            'Content-Type': 'multipart/form-data'
          }
        })
        // console.log(data, url, 'rest')
        if (data) {
          setvisible(false)
          dispatch(getUserbyMobileNo(UserbyMobileNo[0].profile?.mobileNumber))
          ToastAndroid.show("Image uploaded succesfully", ToastAndroid.SHORT)
          setPreviewVisible(false)
          setStartCamera(false)
          navigation.goBack()
        }
      } catch (error) {
        __savePhoto(capturedImage)
        console.log(error)
        setvisible(false)
      }
    }
  }
  const Licenceregex = "^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$";
  const aadharregexp = /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: .2,
      });
      if (!result.canceled) {
        const arr = await FileSystem.getInfoAsync(result.assets[0].uri);
        setStartCamera(false)
        setCapturedImage(result.assets[0].uri)
        try {
          const fileSizeInMB = convertBytesToMB(arr.size);
          console.log(fileSizeInMB);
          if (fileSizeInMB > 2) return setdisabled(true)
          setdisabled(false)
          setTimeout(() => {
            __savePhoto(result.assets[0].uri)
          }, 1000);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* topbox */}
      <CustomActivityIndicator visible={visible} />
      <AppText style={tw`my-2 font-semibold self-center text-base`}>{title} </AppText>
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
              <CameraPreview photo={capturedImage} />
            ) :
              <TouchableOpacity onPress={takeImage} style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
                {/* <MaterialCommunityIcons name="camera" size={74} color={'gray'} /> */}
              </TouchableOpacity>
            }
          </View>
        ) :
          <>
            <Image source={{ uri: capturedImage }} style={{
              flex: 1,
              width: SIZES.width * .9,
              height: SIZES.width,
            }} />
          </>
        }
      </View>
      {/* bottombox */}
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={takeImage}
          disabled={Boolean(previewVisible)}
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
          <AppButton textStyle={{ fontSize: 11 }} style={tw`h-12 rounded-lg`} title={'Upload from File'} onPress={() => pickImage()} />
          {
            (type === "aadhar" || type === "newRiderAadhar" || type === "uploadAadhar") &&
            <View>
              <AppText style={tw`my-2 font-semibold text-base`}>We need few more details</AppText>
              <AppText style={[tw`my-2 text-xs my-1`, { color: colors.gray }]}>Aadhar Card</AppText>
              <TextInput keyboardType="number-pad" maxLength={14} value={onchangetext} onChangeText={(t) => setonchangetext(t)} style={[tw`h-10 rounded p-2`, {
                borderBottomColor: colors.medium,
                borderBottomWidth: 1,
              }]} />
              {
                onchangetext.length > 1 && onchangetext.match(aadharregexp) === null &&
                <AppText style={[tw`my-.2`, { color: 'red', fontSize: 9 }]}>Please enter valid aadhar card number</AppText>
              }
            </View>
          }
          {
            (type === "drivingLicence" || type === "newDriving") &&
            <View>
              <AppText style={tw`my-2 font-semibold text-base`}>We need few more details</AppText>
              <AppText style={[tw`my-2 text-xs my-1`, { color: colors.gray }]}>Driving Licence</AppText>
              <TextInput value={onchangetext} onChangeText={(t) => setonchangetext(t)} style={[tw`h-10 rounded p-2`, {
                borderBottomColor: colors.medium,
                borderBottomWidth: 1,
              }]} />
              {
                onchangetext.length > 1 && onchangetext.match(Licenceregex) === null &&
                <AppText style={[tw`my-2 my-.2`, { color: 'red', fontSize: 9 }]}>Please enter valid Driving Licence number</AppText>
              }
            </View>
          }
          {
            (type === 'uploadAadhar' || type === 'aadhar') &&
            <View>
              <AppText style={[tw`my-2 text-xs my-1`, { color: colors.gray }]}>Address</AppText>
              <TextInput value={address} onChangeText={(t) => setaddress(t)} style={[tw`h-10 rounded p-2`, {
                borderBottomColor: colors.medium,
                borderBottomWidth: 1,
              }]} />
            </View>
          }
          {/* <AppButton disabled={disabled ? disabled : capturedImage ? false : true} style={tw`h-12 rounded-lg`} textStyle={{ fontSize: 11 }} title={'Save'} onPress={() => {
            __savePhoto()
          }} /> */}
        </ScrollView>
      </View>
    </View>
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

