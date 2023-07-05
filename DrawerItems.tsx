import AppText from "@/components/AppText";
import tw from "@/lib/tailwind";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import { Linking, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { Drawer } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
import { userTokensaveToReducers } from "@/store/createBooking";
import * as Localization from 'expo-localization';
import { i18n } from './language'
import { loadAllRentPool } from "@/store/rentPool";
import { Ionicons } from '@expo/vector-icons';
import colors from './app/config/colors'
import { RootState } from '@/types/RootStateType';
import _ from "lodash";
import { useAppSelector } from '@/hooks/useAppSelector';
import AppButton from "@/components/AppButton";
interface DrawerItemsProps { }

const DrawerItems: React.FC<DrawerItemsProps> = ({ navigation }: any) => {
  const { storeDetail } = useAppSelector((state: RootState) =>
    state.entities.searchBikes,
  );
  const dispatch = useDispatch()
  const [locale, setlocale] = useState(Localization.locale)
  const [value, setvalue] = useState(true)
  i18n.locale = locale;
  const DialCall = () => {

    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${_.get(storeDetail, "user.mobileNumber")}`;
    }
    else {
      phoneNumber = `telprompt:${_.get(storeDetail, "user.mobileNumber")}`;
    }
    Linking.openURL(phoneNumber);
  };
  const checkLocale = async () => {
    try {
      const locale = await AsyncStorage.getItem('locale')
      if (locale === null) {
        await AsyncStorage.setItem('locale', JSON.stringify(Localization.locale))
      } else {
        setlocale(JSON.parse(locale))
        // await AsyncStorage.removeItem('locale')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const changeLocale = async () => {
    navigation.closeDrawer()
    try {
      if (value) {
        await AsyncStorage.setItem('locale', JSON.stringify('hi'))
      } else {
        await AsyncStorage.setItem('locale', JSON.stringify('en-US'))
      }
      setvalue(!value)
      dispatch(loadAllRentPool(`${_.get(storeDetail, "user._store")}`));
    } catch (error) {
      setvalue(!value)
      console.log(error)
    }
  }
  useEffect(() => {
    checkLocale()
  }, [value])

  return (
    <DrawerContentScrollView
      alwaysBounceVertical={false}
      style={tw`p-3`}
      contentContainerStyle={tw.style({ flex: 1 })}>
      <Drawer.Section>
        <View style={[tw`w-25 h-25  self-center mt-10 mb-6 rounded-full justify-center`, { backgroundColor: colors.purple }]}>
          {
            _.get(storeDetail, "user.username") &&
            <AppText style={tw`self-center text-4xl text-white font-bold`}>
              {_.get(storeDetail, "user.username", '').split("")[0]}
            </AppText>
          }
        </View>
        <View>
          <View style={tw`flex-row items-center my-1 justify-between `}>
            <AppText style={[tw` font-bold`, { fontSize: 12 }]}>{_.get(storeDetail, "user.username")}</AppText>
            <AppText style={{ color: colors.purple, fontSize: 12 }}>{`+91` + _.get(storeDetail, "user.mobileNumber")}</AppText>
          </View>
          <View style={tw`flex-row items-center my-1 mb-8 justify-between `}>
            <AppText style={[tw`text-xs font-semibold`, { fontSize: 10 }]}>{_.get(storeDetail, "user.username")}</AppText>
            <AppText style={[tw`text-xs`, { color: colors.purple, fontSize: 10 }]}>{_.get(storeDetail, "user.email")}</AppText>
          </View>
        </View>
      </Drawer.Section>
      <Drawer.Section style={{ marginTop: 15 }}>
        <TouchableOpacity onPress={() => changeLocale()} style={tw`flex-row mt-5 items-center my-3`}>
          <Ionicons name="chatbubble-outline" size={20} color={colors.purple} />
          <AppText style={[tw`text-sm font-bold ml-12`, { color: colors.purple }]}>{i18n.t('Change langauge')}</AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => DialCall()} style={tw`flex-row items-center my-3 `}>
          <Ionicons name="call-outline" size={20} color={colors.purple} />
          <AppText style={[tw`text-sm font-bold  ml-12`, { color: colors.purple }]}>{i18n.t('Contact Us')}</AppText>
        </TouchableOpacity>
      </Drawer.Section>
      <View style={tw.style({ flex: 1 })}></View>
      <Drawer.Section style={tw``}>
        <View style={[tw`items-center justify-center`]}>
          <AppButton onPress={async () => {
            navigation.closeDrawer()
            try {
              dispatch(userTokensaveToReducers(null))
              await AsyncStorage.removeItem('@userExist')
            } catch (e) {
              console.log(e)
            }
          }} title={i18n.t('Logout')} style={[tw`w-1.5/2 items-center p-2`, { elevation: 1.5 }]} />
          <AppText style={[tw`font-bold`, { color: colors.purple, fontSize: 10 }]}>1.0.16</AppText>
        </View>
      </Drawer.Section>
      <AppText style={[tw`font-bold self-center `, { fontSize: 11, color: colors.purple }]}>
        ONEPOINT BIKE SERVICES PRIVATE LIMITED
      </AppText>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(DrawerItems);
