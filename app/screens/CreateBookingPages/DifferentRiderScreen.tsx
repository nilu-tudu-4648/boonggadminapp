import { StyleSheet, TouchableOpacity, View, TextInput, BackHandler, ScrollView, Image } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import AppText from '@/components/AppText'
import tw from '@/lib/tailwind'
import _ from 'lodash'
import colors from '../../config/colors'
import AppButton from '@/components/AppButton'
import routes from '@/navigation/routes';
import { useAppSelector } from '@/hooks/useAppSelector';
import { updateRentBooking } from '@/store/createBooking';
import { useDispatch } from 'react-redux';
import CustomActivityIndicator from '@/components/CustomActivityIndicator';
import PhoneInput from 'react-native-phone-number-input';
import ShowImageDialog from '@/components/ShowImageDialog';

const DifferentRiderScreen = ({ navigation, route }: any) => {
    const { offlineBookingDetails, loading, rentBookingDetails } =
        useAppSelector((state) => state.entities.createBooking);
    const [name, setName] = useState("")
    const [formdata, setformdata] = useState({})
    const [phoneNo, setPhone] = useState("")
    const [imageUrl, setimageUrl] = useState("")
    const [type, settype] = useState<string>("")
    const [showImage, setshowImage] = useState(false)
    const [valid, setValid] = useState(false);
    const [title, settitle] = useState<string>("")
    const phoneInput = useRef<PhoneInput>(null);
    const dispatch = useDispatch()
    useEffect(() => {
        setformdata(rentBookingDetails)
    }, [rentBookingDetails])
    const Procedd = {
        id: _.get(offlineBookingDetails, "_id"),
        checkInInfo: {
            kyc: {
                phoneNo,
                name
            }
        }
    }
    const titles = {
        aadhar: 'Aadhar Front',
        aadharBack: 'Aadhar Back',
        drivingLicence: 'Driving Licence',
        organizationId: 'Org ID,College ID/ supporting docs',
        supportingDocs: 'PG recepit, rent agreement,',
        supportingDocs2: 'light bill-Address proofs',
    }
    const allDocumentsBoolean = Boolean(name && phoneNo && _.get(rentBookingDetails, 'checkInInfo.kyc.drivingLicence') && _.get(rentBookingDetails, 'checkInInfo.kyc.aadhar')
        && _.get(rentBookingDetails, 'checkInInfo.kyc.aadharBack'))
    const onPress = () => {
        navigation.navigate(routes.VERIFY_DOCUMENTS_SCREEN2.route)
        dispatch(updateRentBooking(Procedd))
    }
    BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.goBack()
        return true;
    }, [])
    return (
        <>
            <CustomActivityIndicator visible={loading} />
            <ShowImageDialog title={title} screen="differentuser" type={type} visible={showImage} setshowImage={setshowImage} imageUrl={imageUrl} />
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <AppText style={tw`font-semibold self-center`}>New Rider e-KYC</AppText>
                <ScrollView contentContainerStyle={{ backgroundColor: 'white', alignItems: 'center', width: '100%', justifyContent: 'space-around', }}>
                    <View style={tw`w-9/10`}>
                        <AppText style={[tw`text-xs top-4.5`, { color: '#B9B9B9' }]}>Rider Name</AppText>
                        <TextInput value={name} onChangeText={(t) => setName(t)} style={[tw`h-14 my-2 w-full rounded p-2 border-b-2 border-gray-200`, { fontSize: 11 }]} />
                    </View>
                    <View style={tw`w-9/10 mb-2`}>
                        <AppText style={[tw`text-xs top-1`, { color: '#B9B9B9' }]}>Rider Phone Number</AppText>
                        <PhoneInput
                            ref={phoneInput}
                            containerStyle={[tw`w-full rounded h-14 border-b-2 border-gray-200`, { elevation: 0 }]}
                            textContainerStyle={[tw`bg-white`]}
                            defaultValue={phoneNo}
                            defaultCode="IN"
                            textInputStyle={{ fontSize: 12 }}
                            codeTextStyle={{ fontSize: 12, }}
                            flagButtonStyle={{ width: '19%' }}
                            // countryPickerButtonStyle={{ width: '19%', backgroundColor: 'red' }}
                            layout="first"
                            onChangeText={(text) => {
                                setPhone(text);
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
                            !valid && phoneNo.length > 0 &&
                            <AppText style={{ color: 'red', fontSize: 12, }}>Please enter valid Phone Number</AppText>
                        }
                    </View>
                    <View style={{ ...styles.eachbox, }} >
                        <AntDesign name="idcard" size={23} color={colors.lightblue} />
                        <View style={[tw`self-center items-center`]}>
                            <AppText style={tw`text-xs`}>Step 1</AppText>
                            <AppText style={tw`font-bold text-sm`}>{titles.aadhar}</AppText>
                        </View>
                        {
                            _.get(formdata, 'checkInInfo.kyc.aadhar') ?
                                <TouchableOpacity onPress={() => {
                                    setimageUrl(_.get(formdata, 'checkInInfo.kyc.aadhar', ''))
                                    setshowImage(true)
                                    settype('aadhar')
                                    settitle(titles.aadhar)
                                }}>
                                    <Image source={{ uri: _.get(formdata, 'checkInInfo.kyc.aadhar') }} style={{ width: 20, height: 20 }} />
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => navigation.navigate(routes.CAMERA_SCREEN.route, { type: "aadhar", screen: 'differentuser', title: titles.aadhar })}>
                                    <MaterialCommunityIcons name="camera" size={24} color={colors.purple} />
                                </TouchableOpacity>
                        }
                    </View>
                    <View style={{ ...styles.eachbox, }}>
                        <AntDesign name="idcard" size={23} color={colors.lightblue} />
                        <View style={[tw`self-center items-center`]}>
                            <AppText style={tw`text-xs`}>Step 2</AppText>
                            <AppText style={tw`font-bold text-sm`}>{titles.aadharBack}</AppText>
                        </View>
                        {
                            _.get(formdata, 'checkInInfo.kyc.aadharBack') ?
                                <TouchableOpacity onPress={() => {
                                    setimageUrl(_.get(formdata, 'checkInInfo.kyc.aadharBack', ''))
                                    setshowImage(true)
                                    settype('aadharBack')
                                    settitle(titles.aadharBack)
                                }}>
                                    <Image source={{ uri: _.get(formdata, 'checkInInfo.kyc.aadharBack') }} style={{ width: 20, height: 20 }} />
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => navigation.navigate(routes.CAMERA_SCREEN.route, { type: "aadharBack", screen: 'differentuser', title: titles.aadharBack })}>
                                    <MaterialCommunityIcons name="camera" size={24} color={colors.purple} />
                                </TouchableOpacity>
                        }
                    </View>
                    <View style={{ ...styles.eachbox, }}>
                        <FontAwesome name="drivers-license" size={20} color={colors.purple} />
                        <View style={[tw`self-center items-center`]}>
                            <AppText style={tw`text-xs`}>Step 3</AppText>
                            <AppText style={tw`font-bold text-sm`}>{titles.drivingLicence}</AppText>
                        </View>
                        {
                            _.get(formdata, 'checkInInfo.kyc.drivingLicence') ?
                                <TouchableOpacity onPress={() => {
                                    setimageUrl(_.get(formdata, 'checkInInfo.kyc.drivingLicence', ''))
                                    setshowImage(true)
                                    settype('drivingLicence')
                                    settitle(titles.drivingLicence)
                                }}>
                                    <Image source={{ uri: _.get(formdata, 'checkInInfo.kyc.drivingLicence') }} style={{ width: 20, height: 20 }} />
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => navigation.navigate(routes.CAMERA_SCREEN.route, { type: "drivingLicence", screen: 'differentuser', title: titles.drivingLicence })}>
                                    <MaterialCommunityIcons name="camera" size={24} color={colors.purple} />
                                </TouchableOpacity>
                        }
                    </View>
                    <View style={{ ...styles.eachbox, }}>
                        <FontAwesome name="drivers-license" size={20} color={colors.purple} />
                        <View style={[tw`self-center items-center`]}>
                            <AppText style={tw`text-xs`}>Step 4</AppText>
                            <AppText style={tw`font-bold text-sm`}>{titles.organizationId}</AppText>
                        </View>
                        {
                            _.get(formdata, 'checkInInfo.kyc.organizationId') ?
                                <TouchableOpacity onPress={() => {
                                    setimageUrl(_.get(formdata, 'checkInInfo.kyc.organizationId', ''))
                                    setshowImage(true)
                                    settype('organizationId')
                                    settitle(titles.organizationId)
                                }}>
                                    <Image source={{ uri: _.get(formdata, 'checkInInfo.kyc.organizationId') }} style={{ width: 20, height: 20 }} />
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => navigation.navigate(routes.CAMERA_SCREEN.route, { type: "organizationId", screen: 'differentuser', title: titles.organizationId })}>
                                    <MaterialCommunityIcons name="camera" size={24} color={colors.purple} />
                                </TouchableOpacity>
                        }
                    </View>
                    <View style={{ ...styles.eachbox, }}>
                        <FontAwesome name="drivers-license" size={20} color={colors.purple} />
                        <View style={[tw`items-center`]}>
                            <AppText style={tw`text-xs`}>Step 5</AppText>
                            <AppText style={tw`font-bold text-sm`}>{titles.supportingDocs}</AppText>
                            <AppText style={tw`font-bold text-sm`}>{titles.supportingDocs2}</AppText>
                        </View>
                        {
                            _.get(formdata, 'checkInInfo.kyc.supportingDocs') ?
                                <TouchableOpacity onPress={() => {
                                    setimageUrl(_.get(formdata, 'checkInInfo.kyc.supportingDocs', ''))
                                    setshowImage(true)
                                    settype('supportingDocs')
                                    settitle(titles.supportingDocs)
                                }}>
                                    <Image source={{ uri: _.get(formdata, 'checkInInfo.kyc.supportingDocs') }} style={{ width: 20, height: 20 }} />
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => navigation.navigate(routes.CAMERA_SCREEN.route, { type: "supportingDocs", screen: 'differentuser', title: titles.supportingDocs })}>
                                    <MaterialCommunityIcons name="camera" size={24} color={colors.purple} />
                                </TouchableOpacity>
                        }
                    </View>
                </ScrollView>
                {/* <AppButton style={tw`h-14 self-center w-8.5/10 rounded-lg`} title='Proceed' onPress={() => onPress()} /> */}
                <AppButton disabled={Boolean(!allDocumentsBoolean)} style={tw`h-13 self-center w-9/10 rounded-lg`} title='Proceed' onPress={() => onPress()} />
            </View>
        </>
    )
}

export default DifferentRiderScreen

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