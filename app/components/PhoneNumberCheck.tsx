import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import AppText from './AppText';

import PhoneInput from 'react-native-phone-number-input';
import tw from '@/lib/tailwind';

interface PhoneNumberCheckProps {
    mobilenotofetch: string
}

const PhoneNumberCheck: React.FC<PhoneNumberCheckProps> = ({ mobilenotofetch }) => {
    const [valid, setValid] = useState(false);
    const phoneInput = useRef<PhoneInput>(null);
    return (
        <View>
            <PhoneInput
                ref={phoneInput}
                containerStyle={[tw`w-full rounded bg-white`, { elevation: 1.5 }]}
                textContainerStyle={[tw`bg-white`]}
                defaultValue={mobilenotofetch}
                defaultCode="IN"
                flagButtonStyle={{ width: '19%' }}
                layout="first"
                onChangeText={(text) => {
                    setmobilenotofetch(text);
                }}
                onChangeFormattedText={(text) => {
                    const checkValid = phoneInput.current?.isValidNumber(text);
                    setValid(checkValid ? checkValid : false);
                }}
                countryPickerProps={{ withAlphaFilter: true }}
                withShadow
                textInputProps={{
                    maxLength: 10
                }}
            />
            {
                !valid && mobilenotofetch.length > 0 &&
                <AppText style={{ color: 'red', fontSize: 12, top: 5 }}>Please enter valid Phone Number</AppText>
            }
        </View>
    )
}

export default PhoneNumberCheck

const styles = StyleSheet.create({})