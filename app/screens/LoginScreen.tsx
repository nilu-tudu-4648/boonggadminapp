import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import tw from "../lib/tailwind";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userTokensaveToReducers } from "@/store/createBooking";
import { SIZES } from "../config/styles";

import ActivityIndicator from "@/components/CustomActivityIndicator";
import AppText from "@/components/AppText";
import KeyboardAvoidingContainer from "@/components/KeyBoardAvoidingContainer";
import { apiPaths } from "@/api/apiPaths";
import jwt_decode from "jwt-decode";
import { saveStoredata } from "@/store/searchBikes";
const LoginScreen: React.FC = ({ navigation }: any) => {
  const [loginFailed, setLoginFailed] = useState<boolean>();
  const [loading, setloading] = useState<boolean>(false);
  const [loginSuccess, setloginSuccess] = useState<boolean>(false);

  interface FormValues {
    email: string;
    password: string;
  }
  const dispatch = useDispatch()
  const handleSubmit = async ({ email, password }: FormValues) => {
    setloading(true)
    const config = {
      method: 'post',
      url: `${apiPaths.prod.url}/api/login`,
      // url: 'http://192.168.29.36:3100/api/login', //ipadd
      data: {
        "username": email,
        "password": password
      }
    };
    try {
      const { data } = await axios(config)
      const decoded = jwt_decode(data.token);
      dispatch(saveStoredata(decoded))
      if (!data.token) {
        setloading(false)
        setLoginFailed(true)
      }
      setLoginFailed(false);
      setloginSuccess(true)
      await AsyncStorage.setItem('@userExist', JSON.stringify(data.token))
      const usertype = await AsyncStorage.getItem('firsttimeuser')
      if (usertype === null) {
        await AsyncStorage.setItem('firsttimeuser', JSON.stringify('true'))
      }
      setloading(false)
      dispatch(userTokensaveToReducers(data.token))
    } catch (error) {
      console.log(error)
      setloading(false)
      setLoginFailed(true)
    }

  };

  //  login 
  //  check if localStorage is null 
  //  if null then user is new setto true
  //  if not null user is old  

  //  after show set to false 
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This is required").email().label("Email"),
    password: Yup.string().required("This is required").min(4).label("Password"),
  });
  // boonggstorehyderabad@boongg.com	
  // boongg111
  const initialValues: FormValues = {
    email: "wagholimotors@boongg.com", //excelbikes@boongg.com"wagholimotors@boongg.com"
    password: "password", //wagholi001
    // email: "",
    // password: "",
  };

  return (
    <Screen style={[tw`w-full bg-black`]}>
      <ActivityIndicator visible={loading} />
      <View style={{ width: 350, height: 350, borderRadius: 350 / 2, backgroundColor: 'rgba(224, 9, 17, 0.2)', position: 'absolute', top: -180, right: -5, }} />
      <View style={{ width: 350, height: 350, borderRadius: 350 / 2, backgroundColor: 'rgba(225, 6, 20, 0.2)', position: 'absolute', right: -175, top: -120 }} />
      <Image
        resizeMode="contain"
        style={[tw`w-full h-18 my-10`, { position: 'absolute' }]}
        source={require("../assets/boongg-white-logo.png")}
      />
      <KeyboardAvoidingContainer>
        <View style={[tw`p-6`, { marginTop: SIZES.height / 3 }]}>
          <AppText style={[tw`text-white font-bold`, { fontSize: 22 }]}>Login</AppText>
          <AppText style={[tw`text-white font-semibold my-1`, { fontSize: 12, color: "#606969" }]}>Please sign-in to continue</AppText>
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
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="eye-outline"
              name="password"
              placeholder="Password"
              textContentType="password"
              isPassword={true}
            />
            <ErrorMessage
              error={"Invalid email and/or password"}
              visible={loginFailed}
            />
            <SubmitButton title={"Login"} />
          </AppForm>
        </View>
      </KeyboardAvoidingContainer>
    </Screen >
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});
export default LoginScreen;
