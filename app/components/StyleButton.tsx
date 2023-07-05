import React from "react";

import {
    StyleSheet,
    TouchableOpacity,
    GestureResponderEvent,
    ViewStyle,
    TextStyle,
    StyleProp,
} from "react-native";
import colors from "../config/colors";
import tw from "@/lib/tailwind";
import AppText from "./AppText";

interface StyleButtonProps {
    title: string;
    onPress: ((event: GestureResponderEvent) => void) | undefined;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    borderColor?: string;
    disabled?: boolean
}

const StyleButton: React.FC<StyleButtonProps> = ({
    title,
    onPress,
    style,
    borderColor,
    textStyle,
    disabled
}) => {
    return (
        <TouchableOpacity disabled={disabled}
            onPress={onPress} style={[{
                ...styles.bntstyle, borderColor: borderColor ? borderColor : 'green',
            }, style]}>
            <AppText style={[{ fontSize: 8.5, color: borderColor ? borderColor : 'green' }, textStyle]}>{title}</AppText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    bntstyle: {
        borderRadius: 6,
        width: '23%',
        justifyContent: 'center',
        height: 31,
        borderWidth: 1,
        alignItems: 'center',
        marginHorizontal: 3
    },
    text: {
        color: colors.white,
        fontSize: 18,
        textTransform: "uppercase",
    },
});

export default React.memo(StyleButton);
