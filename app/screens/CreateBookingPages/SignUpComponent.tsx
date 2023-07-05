import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getUserbyMobileNo, userDataReceived } from '@/store/createBooking';
import axios from 'axios';
import { AppForm, AppFormField, ErrorMessage, SubmitButton } from '@/components/forms';

import tw from "@/lib/tailwind";
import * as Yup from "yup";
import { useAppSelector } from '@/hooks/useAppSelector';
import routes from '@/navigation/routes';
import ActivityIndicator from '@/components/CustomActivityIndicator';
import AppText from '@/components/AppText';
import { apiPaths } from '@/api/apiPaths';

interface FormValues {
    email: string;
    firstName: string;
    lastName: string;
}
const SignUpComponentScreen = ({ route, navigation }: any) => {

    const { otpData } = useAppSelector((state) => state.entities.createBooking);

    const [isLoading, setisLoading] = useState(false);
    const validationSchema = Yup.object().shape({
        email: Yup.string().required().email().label("Email"),
        firstName: Yup.string().required().label("First Name"),
        lastName: Yup.string().required().label("Last Name"),
    });
    const { mobilenotofetch, otpCode } = route.params;
    const initialValues: FormValues = {
        email: "",
        firstName: "",
        lastName: "",
    };

    const dispatch = useDispatch()
    const handleSubmit = async ({ email, firstName, lastName }: FormValues) => {
        setisLoading(true)
        const formdata = {
            name: firstName + lastName,
            mobileNumber: mobilenotofetch,
            email,
            "id": otpData.user._id,
            "otp": otpCode,
            "timer": 12,
            "isPhone": false,
            "resend": false,
            "isValidOtp": true,
            "needToken": true
        };
        const config = {
            method: "post",
            url: `${apiPaths.prod.url}/api//webuser/updatedetails`,
            headers: {
                "Content-Type": "application/json",
            },
            data: formdata,
        };
        try {
            const { data } = await axios(config);
            console.log(data, 'user created')
            dispatch(getUserbyMobileNo(data.user.profile.mobileNumber))
            if (data.token) {
                // dispatch(userDataReceived(data))
                navigation.replace(routes.CREATE_BOOKING.route, { mobilenotofetch })
            }
            setisLoading(false)
        } catch (error) {
            setisLoading(false)
            console.log(error);
        }
    };
    return (
        <View style={[tw`w-full bg-white`, { flex: 1 }]}>
            <ActivityIndicator visible={isLoading} />
            <AppText style={[tw`font-bold text-lg ml-4`, { color: 'black' }]}>Create User</AppText>
            <ScrollView style={tw`w-full p-4`} keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false}>
                <AppForm
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}>
                    <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        // icon="email"
                        name="email"
                        keyboardType="email-address"
                        placeholder="Email"
                        textContentType="emailAddress"
                        style={{ backgroundColor: 'white' }}
                    />
                    <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="firstName"
                        placeholder="First Name"
                        style={{ backgroundColor: 'white' }}
                    />
                    <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="lastName"
                        placeholder="Last Name"
                        style={{ backgroundColor: 'white' }}
                    />
                    <ErrorMessage
                        error={"Please check details"}
                        visible={false}
                    />
                    <SubmitButton title={"Create User"} />
                </AppForm>
            </ScrollView>
        </View>
    )
}

export default SignUpComponentScreen

const styles = StyleSheet.create({})