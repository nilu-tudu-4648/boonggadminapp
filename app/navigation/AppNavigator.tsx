import type { DrawerNavigationProp } from "@react-navigation/drawer";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import tw from "@/lib/tailwind";
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync, sendnotification } from '../../notification'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashboardScreen from "@/screens/DashboardScreen";
import RentCalculatorScreen from "@/screens/RentCalculatorScreen";
import { createStackNavigator } from "@react-navigation/stack";
import CurrentBookingNavigator from "./CurrentBookingNavigator";
import routes from "./routes";
import VehicleInventoryNavigator from "./VehicleInventoryNavigator";
import LoginScreen from "@/screens/LoginScreen";
import { userTokensaveToReducers } from "@/store/createBooking";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useAppSelector";
import SplashScreen from "@/screens/SplashScreen";
import CreateBookingNavigator from "./CreateBookingNavigator";
import jwt_decode from "jwt-decode";
import * as RootNavigation from '../../RootNavigation';
import ReportsScreen from "@/screens/ReportsScreen";
import { saveStoredata } from "@/store/searchBikes";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,

  }),
});
interface AppNavigatorProps { }

const Stack = createStackNavigator();

const AppNavigator: React.FC<AppNavigatorProps> = () => {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState({});
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    // sendnotification()
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log({ response });
      RootNavigation.navigate(routes.LOGIN.route);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const { userToken } = useAppSelector((state) => state.entities.createBooking);
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch()
  const findUserExist = async () => {
    try {
      const userExist = await AsyncStorage.getItem('@userExist')
      if (userExist !== null) {
        dispatch(userTokensaveToReducers(JSON.parse(userExist)))
        dispatch(saveStoredata(jwt_decode(userExist)))
        setloading(false)
      } else {
        setloading(false)
      }
    } catch (error) {
      setloading(false)
      console.log(error)
    }
  }
  useEffect(() => {
    findUserExist()
  }, [userToken])
  if (loading) {
    return <SplashScreen />;
  }
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        // detachPreviousScreen: !navigation.isFocused(),
        headerShown: userToken ? true : false,
        header: ({ navigation, back }) => (
          <Appbar.Header elevated style={[tw`bg-violet-800`, { elevation: 0 }]} mode="small">
            <Appbar.Action
              icon="menu"
              isLeading
              iconColor={tw.color(`text-neutral-200`)}
              onPress={() =>
                (
                  navigation as any as DrawerNavigationProp<
                    Record<string, never>
                  >
                ).openDrawer()
              }
            />
            < Appbar.Content
              title="Boongg"
              titleStyle={tw.style(`text-neutral-200`)}
            />
          </Appbar.Header>
        ),
      })}>
      {
        !userToken ?
          <Stack.Screen
            name={routes.LOGIN.route}
            component={LoginScreen} /> :
          <>
            <Stack.Screen
              name={routes.DASHBOARD.route}
              component={DashboardScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={routes.SOP_SCREEN.route}
              component={ReportsScreen} />
            {/* component={SOPScreen} /> */}
            <Stack.Screen
              name={routes.CURRENT_BOOKING.route}
              component={CurrentBookingNavigator}
            />
            <Stack.Screen
              name={routes.CREATE_BOOKING_N.route}
              component={CreateBookingNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={routes.VEHICLE_INVENTORY.route}
              component={VehicleInventoryNavigator}
            />
            <Stack.Screen
              name={routes.RENT_CALCULATOR.route}
              component={RentCalculatorScreen}
            />
          </>
      }
    </Stack.Navigator>

  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AppNavigator;
