import tw from "@/lib/tailwind";
import colors from "../config/colors";
import React, { Dispatch, SetStateAction } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import AppText from "./AppText";
import StyleButton from "./StyleButton";
import _ from "lodash";
import ZoomableImage from "./ZoomableImage";

interface ShowImageonPickupProps {
    visible: boolean,
    hideDialog: Dispatch<SetStateAction<string>>;
    imageUrl?: object,
}

const ShowImageonPickup: React.FC<ShowImageonPickupProps> = ({
    visible,
    hideDialog,
    imageUrl,
}) => {
    const textstyle = tw`text-gray-500 text-sm my-2 font-bold`
    return (
        <Portal>
            <Dialog style={[tw`p-3 bg-white w-9.2/10 self-center`, { height: 500 }]} visible={visible} onDismiss={() => hideDialog("")}>
                <AppText style={tw`text-black my-2`}>Uploaded Images</AppText>
                <ScrollView style={tw`w-full`}>
                    <AppText style={textstyle}>Driving Licence</AppText>
                    <ZoomableImage source={_.get(imageUrl, "_webuserId.profile.newDriving")} />
                    <AppText style={textstyle}>Aadhar</AppText>
                    <ZoomableImage source={_.get(imageUrl, "_webuserId.profile.aadhar")} />
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

export default React.memo(ShowImageonPickup);
