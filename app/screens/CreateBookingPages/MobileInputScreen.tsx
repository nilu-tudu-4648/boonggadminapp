import { Image, StyleSheet, View, ToastAndroid, BackHandler, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AppText from '@/components/AppText';
import { useDispatch } from 'react-redux';
import tw from "@/lib/tailwind";
import { getrentbookinguserOngoing, getUserbyMobileNo, stepCountValuesaveToReducers } from '@/store/createBooking';

import PhoneInput from 'react-native-phone-number-input';
import { useAppSelector } from '@/hooks/useAppSelector';
import ActivityIndicator from '@/components/CustomActivityIndicator';
import routes from '@/navigation/routes';
import AppButton from '@/components/AppButton';
import Screen from '@/components/Screen';
import { useNavigationState } from '@react-navigation/native';


const MobileInputScreen = ({ navigation }: any) => {
    const { UserbyMobileNo, loading } = useAppSelector((state) =>
        state.entities.createBooking);
    const [phoneInputenable, setphoneInputenable] = useState(false);
    const [mobilenotofetch, setmobilenotofetch] = useState('');
    const [valid, setValid] = useState(false);
    const phoneInput = useRef<PhoneInput>(null);
    const dispatch = useDispatch();
    const navigationState = useNavigationState(state => state);
    const activeRouteName = navigationState.routes[navigationState.index].name;
    useEffect(() => {
        if (activeRouteName === 'MobileInputScreen') {
            if (UserbyMobileNo[0]?.email) {
                dispatch(getrentbookinguserOngoing(UserbyMobileNo[0]?._id))
                dispatch(stepCountValuesaveToReducers(0))
                navigation.replace(routes.CREATE_BOOKING.route, { mobilenotofetch })
            } else {
                setphoneInputenable(false)
                mobilenotofetch && navigation.navigate(routes.OTP_COMPONENT_SCREEN.route, { mobilenotofetch })
            }
        }
    }, [UserbyMobileNo])
    BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.replace(routes.DASHBOARD.route)
        return () => true
    }, [])
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setphoneInputenable(true)
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setphoneInputenable(false)
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);
    return (
        <Screen style={tw`bg-white`}>
            <ActivityIndicator visible={loading} />
            <View style={[tw`w-full p-4`]}>
                {
                    !phoneInputenable &&
                    <Image resizeMode="contain" style={[tw`w-full`, { height: '80%' }]} source={require('../../assets/02_02_Introduction_Screen.png')} />
                }
            </View>
            <View style={[tw`w-full p-3`, { flex: 1, justifyContent: 'flex-end' }]}>
                <AppText style={[tw`font-semibold self-center w-full mt-1`, { fontSize: 16 }]}>Please enter Customer's mobile</AppText>
                <AppText style={[tw`font-semibold self-center w-full mb-1`, { fontSize: 16 }]}>number to proceed</AppText>
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
                <AppButton title='Search' onPress={() => {
                    valid ?
                        dispatch(getUserbyMobileNo(mobilenotofetch))
                        : ToastAndroid.show('Please enter valid Phone Number', ToastAndroid.SHORT);
                }} />
                {
                    phoneInputenable &&
                    <View style={[tw`w-full`, { height: '52%' }]} />
                }
            </View>
        </Screen>
    )
}

export default MobileInputScreen

const styles = StyleSheet.create({})

{/* {
      checkInComplete.boonggBookingId &&
      <AppText style={[
        tw`p-2 my-5 w-full bg-green-200`,
        { elevation: 2, borderRadius: 8, fontSize: 11 },
      ]}>Bike Successfully checkin for Booking Id:{checkInComplete.boonggBookingId}</AppText>
    } */}