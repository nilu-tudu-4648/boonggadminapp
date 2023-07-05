import React, { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, ToastAndroid, TouchableOpacity, View } from "react-native";

import AppText from "@/components/AppText";
import tw from "@/lib/tailwind";
import formatDate from "@/utils/formatDate";

import _ from "lodash";
import { Button, Dialog, Divider, Portal } from "react-native-paper";
import { useDispatch } from "react-redux";
import colors from "../config/colors";
import StyleButton from "./StyleButton";
import moment from "moment";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { getSingleRentPool, loadAllBikesListMaintenance, loadAllRentPool } from "@/store/rentPool";
import axios from "axios";
import CustomActivityIndicator from "./CustomActivityIndicator";
import { useAppSelector } from "@/hooks/useAppSelector";
import { apiPaths } from "@/api/apiPaths";
import { convertBytesToMB } from "./constants/functions";

import DateTimePickerModal from "react-native-modal-datetime-picker";
interface UploadimageDialogProps {
  visible: boolean
  selectforuploadDocument: { [key: string]: object | string | number | null | any };
  setvisibleDialog: React.Dispatch<React.SetStateAction<any>>
  maintenance?: boolean
}
const UploadimageDialog: React.FC<UploadimageDialogProps> = ({
  visible,
  setvisibleDialog
}) => {
  const { loading, singleRentPoll } = useAppSelector((state) => state.entities.rentPool);
  const { storeDetail } = useAppSelector((state: any) => state.entities.searchBikes);
  const { userToken } = useAppSelector((state) => state.entities.createBooking);
  const dispatch = useDispatch()
  const [date, setDate] = useState<Date | undefined | string | null>('dd/mm/yyyy');
  const [pucDate, setpucDate] = useState<Date | undefined | string | null>('dd/mm/yyyy');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [docType, setdocType] = useState('');
  const [capturedImage, setCapturedImage] = useState<any>({
    rc: "",
    puc: "",
    licence: "",
  })
  const uploadimage = async (uri: string, type: string) => {
    const name = 'name'
    const Imagedata = new FormData();
    Imagedata.append('uploads', {
      uri,
      type: `image/jpeg`,
      name
    })
    Imagedata.append('formData', `{"id":"${_.get(singleRentPoll, "_id")}","docType":"${type ? type : docType}","expiryDate":"${docType === 'puc' ? pucDate : date}"}`)
    const url2 = `${apiPaths.prod.url}/api/rent-pool/upload-doc/${type}/${_.get(singleRentPoll, "registrationNumber")}`
    try {
      const { data } = await axios.post(url2, Imagedata, {
        headers: {
          'Authorization': userToken,
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(data, 'data')
      dispatch(getSingleRentPool(`${_.get(data, "_id")}`))
      ToastAndroid.show("Image uploaded succesfully", ToastAndroid.SHORT)
      setDate(null)
      setpucDate(null)
    } catch (error) {
      uploadimageAgain(uri, type)
      console.log(error)
    }
  }
  const uploadimageAgain = async (uri: string, type: string) => {
    const name = 'name'
    const Imagedata = new FormData();
    Imagedata.append('uploads', {
      uri,
      type: `image/jpeg`,
      name
    })
    Imagedata.append('formData', `{"id":"${_.get(singleRentPoll, "_id")}","docType":"${type ? type : docType}","expiryDate":"${docType === 'puc' ? pucDate : date}"}`)
    const url2 = `${apiPaths.prod.url}/api/rent-pool/upload-doc/${type}/${_.get(singleRentPoll, "registrationNumber")}`
    try {
      const { data } = await axios.post(url2, Imagedata, {
        headers: {
          'Authorization': userToken,
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(data, 'data')
      dispatch(getSingleRentPool(`${_.get(data, "_id")}`))
      dispatch(loadAllRentPool(`${_.get(storeDetail, "user._store")}`));
      ToastAndroid.show("Image uploaded succesfully", ToastAndroid.SHORT)
      setDate(null)
      // setpucDate(null)
    } catch (error) {
      ToastAndroid.show("Something went wrong try again", ToastAndroid.SHORT)
      console.log(error)
    }
  }
  const pickImage = async (type: string) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: .2,
      });
      if (!result.canceled) {
        uploadimage(result.assets[0].uri, type)
        if (type === "rc") {
          setCapturedImage({ ...capturedImage, rc: result.assets[0].uri })
        } else if (type === "puc") {
          setCapturedImage({ ...capturedImage, puc: result.assets[0].uri })
        } else if (type === "licence") {
          setCapturedImage({ ...capturedImage, licence: result.assets[0].uri })
        }
        const arr = await FileSystem.getInfoAsync(result.assets[0].uri);
        try {
          const fileSizeInMB = convertBytesToMB(arr.size);
          console.log(fileSizeInMB);
          if (fileSizeInMB > 2) return ToastAndroid.show('File Size is greater than 2', ToastAndroid.SHORT)
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.log(error)
    }
  };
  const onDismissClear = () => {
    setvisibleDialog("")
    setCapturedImage({
      rc: "",
      puc: "",
      licence: "",
    })
    setDate(null)
    setpucDate(null)
    hideDatePicker()
  }
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: Date) => {
    if (docType !== 'puc') {
      setDate(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)
    } else {
      setpucDate(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)
    }
    hideDatePicker()
  }
  return (
    <Portal>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Dialog visible={visible} style={tw`bg-white`} onDismiss={() => onDismissClear()}>
        <CustomActivityIndicator visible={loading} />
        <AppText style={[tw`m-4`, { color: colors.purple, fontSize: 16 }]}>{`Upload Documents`}</AppText>
        <Dialog.Content>
          <View style={tw`my-1`}>
            <AppText style={[tw`text-gray-600 font-bold text-xs my-1`]}>{`Upload RC`}</AppText>
            <View style={tw`flex-row justify-between`}>
              {
                capturedImage.rc ?
                  <Image source={{ uri: capturedImage.rc }} style={[tw`w-1/2 bg-gray-300 rounded-lg`, { height: 90 }]} /> :
                  <View style={[tw`w-1/2 bg-gray-300 rounded-lg`, { height: 90 }]} />
              }
              <StyleButton title="Choose File" borderColor={colors.lightblue} textStyle={{ fontSize: 8 }} style={{ width: '32%', height: 30, alignSelf: 'flex-end' }} onPress={() => {
                pickImage("rc")
              }} />
            </View>
          </View>
          <View style={tw`my-1`}>
            <AppText style={[tw`text-gray-600 font-bold text-xs my-1`]}>{`Upload PUC`}</AppText>
            <View style={tw`flex-row justify-between `}>
              {
                capturedImage.puc ?
                  <Image source={{ uri: capturedImage.puc }} style={[tw`w-1/2 bg-gray-300 rounded-lg`, { height: 90 }]} /> :
                  <View style={[tw`w-1/2 bg-gray-300 rounded-lg`, { height: 90 }]} />
              }
              <View style={tw`w-5/10 justify-between`}>
                <TouchableOpacity onPress={() => {
                  showDatePicker()
                  setdocType('puc')
                }}>
                  <AppText style={tw`text-xs self-end mr-2 text-gray-600`}>
                    PUC Expiry Date
                  </AppText>
                  <AppText style={tw`text-xs self-end mt-2 mr-2 font-semibold text-gray-600`}>
                    {pucDate ? pucDate : moment(_.get(singleRentPoll, "pucFiles[0].expiryDate")).format('l')}
                    {/* {pucDate} */}
                  </AppText>
                </TouchableOpacity>
                <StyleButton title="Choose File" borderColor={colors.lightblue} textStyle={{ fontSize: 8 }} style={{ width: '65%', height: 30, alignSelf: 'flex-end' }} onPress={() => {
                  pickImage("puc")
                }} />
              </View>
            </View>
          </View>
          <View style={tw`my-1`}>
            <AppText style={[tw`text-gray-600 font-bold text-xs my-1`]}>{`Upload licence`}</AppText>
            <View style={tw`flex-row justify-between `}>
              {
                capturedImage.licence ?
                  <Image source={{ uri: capturedImage.licence }} style={[tw`w-1/2 bg-gray-300 rounded-lg`, { height: 90 }]} /> :
                  <View style={[tw`w-1/2 bg-gray-300 rounded-lg`, { height: 90 }]} />
              }
              <View style={tw`w-5/10 justify-between`}>
                <TouchableOpacity onPress={() => {
                  showDatePicker()
                  setdocType('licence')
                }} style={[tw`p-2 rounded-md items-center justify-center`, { alignSelf: 'flex-end' }]}>
                  <AppText style={tw`text-xs font-semibold text-gray-600`}>
                    Insurance Expiry Date
                  </AppText>
                  <AppText style={tw`text-xs self-end mt-2 mr-2 font-semibold text-gray-600`}>
                    {date ? date : moment(_.get(singleRentPoll, "licenceFiles[0].expiryDate")).format('l')}
                  </AppText>
                </TouchableOpacity>
                <StyleButton title="Choose File" borderColor={colors.lightblue} textStyle={{ fontSize: 8 }} style={{ width: '65%', height: 30, alignSelf: 'flex-end' }} onPress={() => {
                  pickImage("licence")
                }} />
              </View>
            </View>
          </View>
        </Dialog.Content>
        <StyleButton title="Submit"
          borderColor={colors.green}
          textStyle={{ fontSize: 11 }}
          style={{ width: '35%', height: 35, alignSelf: 'flex-end', bottom: 12, right: 12 }}
          onPress={() => {
            dispatch(loadAllRentPool(`${_.get(storeDetail, "user._store")}`));
            onDismissClear()
          }} />
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(UploadimageDialog);
