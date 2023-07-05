import React from "react";
import {
    StyleSheet,
    View,
    ViewStyle,
    StyleProp,
    ScrollView,
} from "react-native";
import tw from "@/lib/tailwind";
import { SIZES } from "../config/styles";

const ScrollScreen = ({
    children,
    style,
}: {
    children: JSX.Element | JSX.Element[];
    style?: StyleProp<ViewStyle>;
}) => {
    return (
        <ScrollView keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false}>
            <View style={[tw`bg-white p-1`, { flex: 1, height: SIZES.height - 50 }, style]}>
                {children}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1 },
});

export default ScrollScreen;
