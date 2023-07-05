import React from "react";
import {
    Keyboard,
    ScrollView,
    Pressable,
    Platform,
    ViewStyle,
    StyleProp,
    KeyboardAvoidingView,
} from "react-native";

const KeyboardAvoidingContainer = ({
    children,
}: {
    children: JSX.Element | JSX.Element[];
    style?: StyleProp<ViewStyle>;
}) => {
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'transparent' }}
            behavior={Platform.OS === 'ios' ? "padding" : 'height'}
            keyboardVerticalOffset={30}>
            <ScrollView keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false} >
                <Pressable onPress={Keyboard.dismiss}>
                    {children}
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default KeyboardAvoidingContainer;
