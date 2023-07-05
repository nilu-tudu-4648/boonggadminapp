import tw from "@/lib/tailwind";
import colors from "../config/colors";
import React, { Dispatch, SetStateAction } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import AppText from "./AppText";
import StyleButton from "./StyleButton";
import _ from "lodash";
import ZoomableImage from "./ZoomableImage";

interface ShowImageDialogonDropProps {
    visible: boolean,
    hideDialog: Dispatch<SetStateAction<string>>;
    imageUrl?: object,
}

const ShowImageDialogonDrop: React.FC<ShowImageDialogonDropProps> = ({
    visible,
    hideDialog,
    imageUrl,
}) => {
    const textstyle = tw`text-gray-500 text-sm my-2 font-bold`
    return (
        <Portal>
            <Dialog style={[tw`p-3 bg-white  self-center m-2`, { height: 500, width: '90%' }]} visible={visible} onDismiss={() => hideDialog("")}>
                <AppText style={tw`text-black my-2`}>Uploaded Images</AppText>
                <ScrollView>
                    <AppText style={textstyle}>Aadhar</AppText>
                    <ZoomableImage source={_.get(imageUrl, "_webuserId.profile.aadhar")} />
                    <AppText style={textstyle}>Aadhar Back</AppText>
                    <ZoomableImage source={_.get(imageUrl, "_webuserId.profile.aadharBack")} />
                    <AppText style={textstyle}>Driving Licence</AppText>
                    <ZoomableImage source={_.get(imageUrl, "_webuserId.profile.newDriving")} />
                    <AppText style={textstyle}>Org ID,College ID/ supporting docs</AppText>
                    <ZoomableImage source={_.get(imageUrl, "_webuserId.profile.organizationId")} />
                    <AppText style={textstyle}>PG recepit, rent agreement,light bill-Address proofs</AppText>
                    <ZoomableImage source={_.get(imageUrl, "_webuserId.profile.supportingDocs")} />
                    {
                        _.get(imageUrl, "checkInInfo.kyc.drivingLicence") ?
                            <>
                                <AppText style={tw`text-black text-sm my-1`}>Diffrent Rider</AppText>
                                <AppText style={textstyle}>Aadhar</AppText>
                                <ZoomableImage source={_.get(imageUrl, "checkInInfo.kyc.aadhar")} />
                                <AppText style={textstyle}>Aadhar Back</AppText>
                                <ZoomableImage source={_.get(imageUrl, "checkInInfo.kyc.aadharBack")} />
                                <AppText style={textstyle}>Driving Licence</AppText>
                                <ZoomableImage source={_.get(imageUrl, "checkInInfo.kyc.drivingLicence")} />
                                <AppText style={textstyle}>Org ID,College ID/ supporting docs</AppText>
                                <ZoomableImage source={_.get(imageUrl, "checkInInfo.kyc.organizationId")} />
                                <AppText style={textstyle}>PG recepit, rent agreement,light bill-Address proofs</AppText>
                                <ZoomableImage source={_.get(imageUrl, "checkInInfo.kyc.supportingDocs")} />
                            </> : null
                    }
                    <AppText style={textstyle}>Front</AppText>
                    <ZoomableImage source={_.get(imageUrl, "checkInInfo.images.front")} />
                    <AppText style={textstyle}>Back</AppText>
                    <ZoomableImage source={_.get(imageUrl, "checkInInfo.images.back")} />
                    <AppText style={textstyle}>Left</AppText>
                    <ZoomableImage source={_.get(imageUrl, "checkInInfo.images.left")} />
                    <AppText style={textstyle}>Right</AppText>
                    <ZoomableImage source={_.get(imageUrl, "checkInInfo.images.right")} />
                    <AppText style={textstyle}>Customer photo with bike</AppText>
                    <ZoomableImage source={_.get(imageUrl, "checkInInfo.images.selfieWithBike")} />
                </ScrollView>
                <View style={tw`flex-row self-end mt-2`}>
                    <StyleButton
                        title="Close"
                        borderColor={colors.green}
                        textStyle={{ fontSize: 11 }}
                        style={{ width: '30%', height: 35 }}
                        onPress={() => {
                            hideDialog('')
                        }} />
                </View>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default React.memo(ShowImageDialogonDrop);
