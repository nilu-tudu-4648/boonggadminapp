import { Image, StyleSheet, TouchableOpacity, View, TextInput, ToastAndroid, BackHandler } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import AppText from '@/components/AppText'
import tw from "@/lib/tailwind";
import OTPInput from "../../components/OTPInput ";
import { useDispatch } from 'react-redux';
import { i18n } from '../../../language'
import { clearFailedMsg, sendOtptoUser, userotpVerify } from '@/store/createBooking';
import { useAppSelector } from '@/hooks/useAppSelector';
import ActivityIndicator from '@/components/CustomActivityIndicator';
import routes from '@/navigation/routes';
import colors from '../../config/colors';
import AppButton from '@/components/AppButton';
const OtpComponentScreen = ({ route, navigation }: any) => {
    const { otpSent, otpVerifyDone, loading, failedMsg } = useAppSelector((state) =>
        state.entities.createBooking);
    const [otpCode, setOTPCode] = useState("");
    let timer = () => { };
    const [timerShow, settimerShow] = useState(false);
    const [disableResend, setdisableResend] = useState(false);
    const [isPinReady, setIsPinReady] = useState(false);
    const maximumCodeLength = 6;
    const { mobilenotofetch } = route.params;
    useEffect(() => {
        if (otpVerifyDone) {
            navigation.replace(routes.SIGNUP_COMPONENT_SCREEN.route, { mobilenotofetch, otpCode })
        }
    }, [otpVerifyDone])
    const dispatch = useDispatch()
    BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.replace(routes.MOBILENO_INPUT_SCREEN.route)
        dispatch(clearFailedMsg())
        return () => true
    }, [])

    const [timeLeft, setTimeLeft] = useState(60);
    const startTimer = useCallback(() => {
        timer = setTimeout(() => {
            if (timeLeft <= 0) {
                clearTimeout(timer);
                setdisableResend(false)
                return false;
            }
            setTimeLeft(timeLeft - 1);
        }, 1000)
    }, [timeLeft])
    useEffect(() => {
        startTimer();
        return () => clearTimeout(timer);
    });
    return (
        <>
            <ActivityIndicator visible={loading} />
            <View style={[tw`w-full p-4 justify-between bg-white`]}>
                {
                    !otpSent &&
                    <View style={tw`w-full h-full justify-between`}>
                        <View>
                            <AppText style={tw`bg-green-300 rounded text-sm p-1`}>User details does not exist!... Please create New User!</AppText>
                            <AppText style={tw`font-semibold  text-lg my-4`}>{i18n.t('Verify OTP to create Booking')}</AppText>
                            <View style={[tw`w-9.5/10  my-3 flex-row h-11 items-center p-1`, { fontSize: 17, borderBottomColor: 'black', borderBottomWidth: 1 }]}>
                                <Image resizeMode="contain" style={[tw`w-1/10 self-center`, { height: 23 }]} source={require('../../assets/india.png')} />
                                <AppText style={tw`font-semibold pt-.8 mx-1`}>+91</AppText>
                                <AppText style={tw`font-semibold pt-.8 mx-1`}>{mobilenotofetch}</AppText>
                            </View>
                        </View>
                        <AppButton title=' Send OTP' onPress={() => {
                            settimerShow(!timerShow)
                            setdisableResend(true)
                            dispatch(sendOtptoUser({
                                formdata: {
                                    mobile: mobilenotofetch,
                                }
                            }))
                        }
                        } />
                    </View>
                }
                {otpSent && !otpVerifyDone &&
                    (
                        <View style={tw`w-full h-full pt-4 justify-between`}>
                            <View>
                                <AppText style={tw`font-semibold text-lg m-2 `}>{i18n.t('Verify OTP to create Booking')}</AppText>
                                <AppText style={tw`font-semibold text-gray-400 m-2`}>+91{mobilenotofetch}</AppText>
                                <View style={{ top: -20 }}>
                                    <OTPInput
                                        code={otpCode}
                                        setCode={setOTPCode}
                                        maximumLength={maximumCodeLength}
                                        setIsPinReady={setIsPinReady} />
                                    {
                                        failedMsg ?
                                            <AppText style={{ color: 'red', fontSize: 12, left: 18 }}>Sorry Invalid OTP!</AppText> : null
                                    }
                                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <AppText style={{ color: 'gray', fontSize: 12, left: 18 }}>00: {timeLeft} Sec</AppText>
                                        <TouchableOpacity disabled={disableResend} style={{ alignSelf: 'flex-end' }} onPress={() => {
                                            setOTPCode('')
                                            dispatch(clearFailedMsg())
                                            startTimer()
                                            setTimeLeft(60);
                                            settimerShow(!timerShow)
                                            setdisableResend(true)
                                            dispatch(sendOtptoUser({
                                                formdata: {
                                                    mobile: mobilenotofetch,
                                                }
                                            }))
                                        }}>
                                            <AppText style={{ marginVertical: 3, color: colors.purple, fontSize: 13 }} >{i18n.t('Resend OTP')}</AppText>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <AppButton title=' Verify OTP' onPress={() => {
                                otpCode.length < 6 ? ToastAndroid.show('Invalid OTP entered', ToastAndroid.SHORT) :
                                    dispatch(userotpVerify({
                                        formdata: {
                                            mobile: mobilenotofetch,
                                            otp: otpCode,
                                        }
                                    }))
                            }
                            } />
                        </View>
                    )}
            </View>
        </>
    )
}

export default OtpComponentScreen

const styles = StyleSheet.create({})