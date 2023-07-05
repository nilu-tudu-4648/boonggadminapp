import { BackHandler, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Screen from '@/components/Screen'
import AppText from '@/components/AppText'
import _ from 'lodash'
import tw from '@/lib/tailwind'
import colors from '../../config/colors'
import AppButton from '@/components/AppButton'
import routes from '@/navigation/routes';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Checkbox } from 'react-native-paper';
import CustomActivityIndicator from '@/components/CustomActivityIndicator';
import ShowImageDialog from '@/components/ShowImageDialog';

const VerifyDocuments1 = ({ navigation }: any) => {
    const { loading, UserbyMobileNo } = useAppSelector((state) =>
        state.entities.createBooking);
    const [otherCustomer, setotherCustomer] = useState(false)
    const [imageUrl, setimageUrl] = useState("")
    const [type, settype] = useState<string>("")
    const [title, settitle] = useState<string>("")
    const [showImage, setshowImage] = useState(false)
    BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate(routes.CHECKIN_SCREEN.route)
        return true;
    }, [])
    const titles = {
        aadhar: 'Aadhar Front',
        aadharBack: 'Aadhar Back',
        organizationId: 'Org ID,College ID/ supporting docs',
        supportingDocs: 'PG recepit, rent agreement, ',
        supportingDocs2: 'light bill-Address proofs',
        newDriving: 'Driving Licence',
    }
    const allDocumentsBoolean = Boolean(_.get(UserbyMobileNo[0], 'profile.aadhar') && _.get(UserbyMobileNo[0], 'profile.newDriving'))
    return (
        <>
            <ShowImageDialog screen="" title={title}
                type={type} visible={showImage}
                setshowImage={setshowImage}
                imageUrl={imageUrl} />
            <CustomActivityIndicator visible={loading} />
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView contentContainerStyle={{ backgroundColor: 'white', alignItems: 'center', width: '100%', justifyContent: 'space-around', }}>
                    <AppText style={tw`font-semibold my-3`}>Complete Customer's/Rider e-KYC</AppText>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <View style={{ ...styles.eachbox, }} >
                            <AntDesign name="idcard" size={23} color={colors.lightblue} />
                            <View style={[tw`self-center items-center`]}>
                                <AppText style={tw`text-xs`}>Step 1</AppText>
                                <AppText style={tw`font-bold text-sm`}>{titles.aadhar}</AppText>
                            </View>
                            {
                                _.get(UserbyMobileNo[0], 'profile.aadhar') ?
                                    <TouchableOpacity onPress={() => {
                                        setimageUrl(_.get(UserbyMobileNo[0], 'profile.aadhar'))
                                        setshowImage(true)
                                        settype('uploadAadhar')
                                        settitle(titles.aadhar)
                                    }}>
                                        <Image source={{ uri: _.get(UserbyMobileNo[0], 'profile.aadhar') }} style={{ width: 20, height: 20 }} />
                                    </TouchableOpacity> :
                                    <TouchableOpacity onPress={() => navigation.navigate(routes.CAMERA_SCREEN.route, { type: 'uploadAadhar', screen: "", title: titles.aadhar })}>
                                        <MaterialCommunityIcons name="camera" size={24} color={colors.purple} />
                                    </TouchableOpacity>
                            }
                        </View>
                        <View style={{ ...styles.eachbox, }} >
                            <AntDesign name="idcard" size={23} color={colors.lightblue} />
                            <View style={[tw`self-center items-center`]}>
                                <AppText style={tw`text-xs`}>Step 2</AppText>
                                <AppText style={tw`font-bold text-sm`}>{titles.aadharBack}</AppText>
                            </View>
                            {
                                _.get(UserbyMobileNo[0], 'profile.aadharBack') ?
                                    <TouchableOpacity onPress={() => {
                                        setimageUrl(_.get(UserbyMobileNo[0], 'profile.aadharBack'))
                                        setshowImage(true)
                                        settype('aadharBack')
                                        settitle(titles.aadharBack)
                                    }}>
                                        <Image source={{ uri: _.get(UserbyMobileNo[0], 'profile.aadharBack') }} style={{ width: 20, height: 20 }} />
                                    </TouchableOpacity> :
                                    <TouchableOpacity onPress={() => navigation.navigate(routes.CAMERA_SCREEN.route, { type: 'aadharBack', screen: "", title: titles.aadharBack })}>
                                        <MaterialCommunityIcons name="camera" size={24} color={colors.purple} />
                                    </TouchableOpacity>
                            }
                        </View>
                        <View style={{ ...styles.eachbox, }}>
                            <FontAwesome name="drivers-license" size={20} color={colors.purple} />
                            <View style={[tw`self-center items-center`]}>
                                <AppText style={tw`text-xs`}>Step 3</AppText>
                                <AppText style={tw`font-bold text-sm`}>{titles.newDriving}</AppText>
                            </View>
                            {
                                _.get(UserbyMobileNo[0], 'profile.newDriving') ?
                                    <TouchableOpacity onPress={() => {
                                        setimageUrl(_.get(UserbyMobileNo[0], 'profile.newDriving'))
                                        setshowImage(true)
                                        settype("newDriving")
                                        settitle(titles.newDriving)
                                    }}>
                                        <Image source={{ uri: _.get(UserbyMobileNo[0], 'profile.newDriving') }} style={{ width: 20, height: 20 }} />
                                    </TouchableOpacity> :
                                    <TouchableOpacity onPress={() => navigation.navigate(routes.CAMERA_SCREEN.route, { type: "newDriving", screen: "", title: titles.newDriving })}>
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
                                _.get(UserbyMobileNo[0], 'profile.organizationId') ?
                                    <TouchableOpacity onPress={() => {
                                        setimageUrl(_.get(UserbyMobileNo[0], 'profile.organizationId'))
                                        setshowImage(true)
                                        settype("organizationId")
                                        settitle(titles.organizationId)
                                    }}>
                                        <Image source={{ uri: _.get(UserbyMobileNo[0], 'profile.organizationId') }} style={{ width: 20, height: 20 }} />
                                    </TouchableOpacity> :
                                    <TouchableOpacity onPress={() => navigation.navigate(routes.CAMERA_SCREEN.route, { type: "organizationId", screen: "", title: titles.organizationId })}>
                                        <MaterialCommunityIcons name="camera" size={24} color={colors.purple} />
                                    </TouchableOpacity>
                            }
                        </View>
                        <View style={{ ...styles.eachbox, }}>
                            <FontAwesome name="drivers-license" size={20} color={colors.purple} />
                            <View style={[tw`self-center items-center`]}>
                                <AppText style={tw`text-xs`}>Step 5</AppText>
                                <AppText style={tw`font-bold text-sm`}>{titles.supportingDocs}</AppText>
                                <AppText style={tw`font-bold text-sm`}>{titles.supportingDocs2}</AppText>
                            </View>
                            {
                                _.get(UserbyMobileNo[0], 'profile.supportingDocs') ?
                                    <TouchableOpacity onPress={() => {
                                        setimageUrl(_.get(UserbyMobileNo[0], 'profile.supportingDocs'))
                                        setshowImage(true)
                                        settype("supportingDocs")
                                        settitle(titles.supportingDocs)
                                    }}>
                                        <Image source={{ uri: _.get(UserbyMobileNo[0], 'profile.supportingDocs') }} style={{ width: 20, height: 20 }} />
                                    </TouchableOpacity> :
                                    <TouchableOpacity onPress={() => navigation.navigate(routes.CAMERA_SCREEN.route, { type: "supportingDocs", screen: "", title: titles.supportingDocs })}>
                                        <MaterialCommunityIcons name="camera" size={24} color={colors.purple} />
                                    </TouchableOpacity>
                            }
                        </View>
                        <View style={[tw`flex-row items-center self-start m-3`]}>
                            <Checkbox
                                status={otherCustomer ? "checked" : "unchecked"}
                                onPress={() => {
                                    setotherCustomer(!otherCustomer);
                                }}
                                color={colors.purple}
                            />
                            <AppText style={tw`text-sm`}>Customer is different than rider</AppText>
                        </View>
                    </View>
                    <AppButton disabled={Boolean(!allDocumentsBoolean)} style={tw`h-13 w-9/10 rounded-lg`} title='Proceed' onPress={() => otherCustomer ? navigation.navigate(routes.DIFFERENT_RIDER_SCREEN.route) : navigation.navigate(routes.VERIFY_DOCUMENTS_SCREEN2.route)} />
                </ScrollView>
            </View>
        </>
    )
}

export default VerifyDocuments1

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