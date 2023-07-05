import tw from "@/lib/tailwind";
import colors from "../config/colors";
import React, { Dispatch, SetStateAction } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import AppText from "./AppText";
import StyleButton from "./StyleButton";
import routes from "@/navigation/routes";
import { useNavigation } from "@react-navigation/native";
import ScrollScreen from "./ScrollScreen";
import _ from "lodash";
import { useAppSelector } from "@/hooks/useAppSelector";

interface ShowImageDialogProps {
    visible: boolean,
    setshowImage: Dispatch<SetStateAction<boolean>>,
    imageUrl?: string,
    type: string,
    screen: string,
    title?: string,
}

const ShowImageDialog: React.FC<ShowImageDialogProps> = ({
    visible,
    setshowImage,
    imageUrl,
    type,
    screen,
    title
}) => {
    const { rentBookingDetails } = useAppSelector((state) => state.entities.createBooking);
    const navigation = useNavigation<any>()
    const hideDialog = () => setshowImage(false)
    return (
        <Portal>
            <Dialog style={[tw`p-3 bg-white`, { height: 450, borderRadius: 12 }]} visible={visible} onDismiss={hideDialog}>
                <AppText style={tw`text-gray-500 text-sm my-2`}>Uploaded Images</AppText>
                {
                    screen === "vehiclephotos" ?
                        <ScrollScreen style={{ height: '100%' }}>
                            <AppText style={tw`text-gray-500 text-sm my-2`}>Front</AppText>
                            <Image style={[tw``, { width: '100%', height: 350 }]} source={{ uri: _.get(rentBookingDetails, 'checkInInfo.images.front') }} />
                            <AppText style={tw`text-gray-500 text-sm my-2`}>Back</AppText>
                            <Image style={[tw``, { width: '100%', height: 350 }]} source={{ uri: _.get(rentBookingDetails, 'checkInInfo.images.back') }} />
                            <AppText style={tw`text-gray-500 text-sm my-2`}>Left</AppText>
                            <Image style={[tw``, { width: '100%', height: 350 }]} source={{ uri: _.get(rentBookingDetails, 'checkInInfo.images.left') }} />
                            <AppText style={tw`text-gray-500 text-sm my-2`}>Right</AppText>
                            <Image style={[tw``, { width: '100%', height: 350 }]} source={{ uri: _.get(rentBookingDetails, 'checkInInfo.images.right') }} />
                            <AppText style={[tw`my-2 text-xs my-1`, { color: '#B9B9B9' }]}>Odometer Reading</AppText>
                            <TextInput editable={false} value={_.get(rentBookingDetails, 'checkInInfo.odometer')} style={[tw`h-12 rounded p-2 bg-gray-100`, {
                            }]} />
                            <AppText style={[tw`my-2 text-xs my-1`, { color: '#B9B9B9' }]}>registrationNo</AppText>
                            <TextInput editable={false} value={_.get(rentBookingDetails, 'checkInInfo.registrationNo')} style={[tw`h-12 rounded p-2 bg-gray-100`, {
                            }]} />
                        </ScrollScreen> :
                        screen === "customerdetails" ?
                            <ScrollScreen style={{ height: '100%' }}>
                                <AppText style={tw`text-gray-500 text-sm my-2`}>Customer's Selfie</AppText>
                                <Image style={[tw``, { width: '100%', height: 350 }]} source={{ uri: _.get(rentBookingDetails, 'checkInInfo.images.selfieWithBike') }} />
                                <AppText style={[tw`my-2 text-xs my-1`, { color: '#B9B9B9' }]}>Emergency Contact No</AppText>
                                <TextInput editable={false} value={_.get(rentBookingDetails, 'checkInInfo.emergencyNo')} style={[tw`h-12 rounded p-2 bg-gray-100`, {
                                }]} />
                                <AppText style={[tw`my-2 text-xs my-1`, { color: '#B9B9B9' }]}>Emergency Address</AppText>
                                <TextInput editable={false} value={_.get(rentBookingDetails, 'checkInInfo.emergencyAddress')} style={[tw`h-12 rounded p-2 bg-gray-100`, {
                                }]} />
                            </ScrollScreen>
                            :
                            <Image style={[tw``, { width: '100%', height: 350 }]} source={{ uri: imageUrl }} />
                }
                <View style={tw`flex-row self-end mt-2`}>
                    <StyleButton
                        title="Rescan"
                        borderColor={colors.green}
                        textStyle={{ fontSize: 11 }}
                        style={{ width: '35%', height: 35 }}
                        onPress={() => {
                            screen === "customerdetails" ?
                                navigation.navigate(routes.CUSTOMERS_DETAILS_SCREEN.route) :
                                screen === "vehiclephotos" ?
                                    navigation.navigate(routes.VEHICLE_PHOTOS_SCREEN.route) :
                                    navigation.navigate(routes.CAMERA_SCREEN.route, { type, screen, title })
                            hideDialog()
                        }} />
                    <StyleButton
                        title="Submit"
                        borderColor={colors.green}
                        textStyle={{ fontSize: 11 }}
                        style={{ width: '30%', height: 35 }}
                        onPress={() => {
                            console.log('first')
                            hideDialog()
                        }} />
                </View>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default ShowImageDialog;
