import { BackHandler, Dimensions, FlatList, Image, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from "@/lib/tailwind";
import _ from "lodash";
import { Entypo } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import PickupDropStatsCard from '@/components/PickupDropStatsCard';
import BikeStatusCard from '@/components/BikeStatusCard';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadOngoingBookings } from '@/store/ongoingBooking';
import { cleanonGoingbooking, getrentbookingListBooked, userTokensaveToReducers } from '@/store/createBooking';
import { loadAllBikesListMaintenance, loadAllRentPool } from '@/store/rentPool';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppSelector } from '@/hooks/useAppSelector';
import { RootState } from '@/types/RootStateType';
import useDialog from '@/hooks/useDialog';
import routes from '@/navigation/routes';
import AppText from '@/components/AppText';
import { i18n } from '../../language'
import CustomActivityIndicator from '@/components/CustomActivityIndicator';
import { Button, Dialog, Portal } from 'react-native-paper';
import colors from '../config/colors';
import Screen from '@/components/Screen';
import {
  TourGuideZone, // Main wrapper of highlight component
  useTourGuideController, // hook to start, etc.
} from '../../srcs'
import { getallPickups } from '@/store/pickUpStore';
import { loadCancelledBooking } from '@/store/cancelledBooking';
import { getStorebyid, getCityDetails } from '@/store/searchBikes';
interface DashboardScreenProps {
  navigation: any;
}

const items = [
  {
    label: "Current Booking",
    value: 1,
    image: require("@/assets/reading.png"),
    route: routes.CURRENT_BOOKING.route,
    screen: '',
    text: "See the Current Booking"
  },
  {
    label: "Create Booking",
    value: 2,
    image: require("@/assets/notebook.png"),
    route: routes.CREATE_BOOKING_N.route,
    screen: '',
    text: "You can create Booking for checkin"
  },
  {
    label: "Cancelled Booking",
    value: 3,
    image: require("@/assets/cancel_b.png"),
    route: 'work in progress',
    // route: routes.CURRENT_BOOKING.route,
    screen: 'History',
    text: "Cancelled Booking"
  },
  {
    label: "Rent Calculator",
    value: 4,
    image: require("@/assets/calculator.png"),
    route: 'work in progress',
    screen: '',
    text: "Rent Calculator"
  },
  {
    label: "Vehicle Inventory",
    value: 5,
    image: require("@/assets/vespa.png"),
    route: routes.VEHICLE_INVENTORY.route,
    screen: '',
    text: "You can create Booking"
  },
  {
    label: "Offers",
    value: 6,
    image: require("@/assets/banking.png"),
    route: 'work in progress',
    screen: '',
    text: "List of Offers"
  },
  {
    label: "Account",
    value: 7,
    image: require("@/assets/customer_support.png"),
    route: 'work in progress',
    screen: '',
    text: "My Account"
  },
  {
    label: "SOP",
    value: 8,
    image: require("@/assets/management.png"),
    route: routes.SOP_SCREEN.route,
    screen: '',
    text: "SOP"
  },
  {
    label: "Logout",
    value: 9,
    image: require("@/assets/exit.png"),
    route: '',
    screen: '',
    text: "Logout from App"
  },
];
const STORE_ADMIN_ITEMS = [
  {
    label: "Current Booking",
    value: 1,
    image: require("@/assets/reading.png"),
    route: routes.CURRENT_BOOKING.route,
    screen: '',
    text: "See the Current Booking"
  },
  {
    label: "Create Booking",
    value: 2,
    image: require("@/assets/notebook.png"),
    route: routes.CREATE_BOOKING_N.route,
    screen: '',
    text: "You can create Booking for checkin"
  },
  {
    label: "Cancelled Booking",
    value: 3,
    image: require("@/assets/cancel_b.png"),
    route: 'work in progress',
    // route: routes.CURRENT_BOOKING.route,
    screen: 'History',
    text: "Cancelled Booking"
  },
  {
    label: "Vehicle Inventory",
    value: 5,
    image: require("@/assets/vespa.png"),
    route: routes.VEHICLE_INVENTORY.route,
    screen: '',
    text: "You can create Booking"
  },
  {
    label: "Logout",
    value: 9,
    image: require("@/assets/exit.png"),
    route: '',
    screen: '',
    text: "Logout from App"
  },
];
const data = [
  {
    component: <PickupDropStatsCard />,
  },
  {
    component: <BikeStatusCard />,
  },
];
const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const { visible, hideDialog, showDialog } = useDialog();
  const [logoutvisible, setlogoutvisible] = React.useState(false);
  const { loading } = useAppSelector((state: RootState) => state.entities.rentPool);
  const { storeDetail } = useAppSelector((state: RootState) => state.entities.searchBikes);
  const insets = useSafeAreaInsets();
  const [userfirst, setuserfirst] = useState(null)
  const getFirstuser = async () => {
    try {
      const data = await AsyncStorage.getItem("firsttimeuser")
      if (data !== null) {
        setuserfirst(JSON.parse(data))
      }
    } catch (error) {
      console.log(error)
    }
  }
  const dispatch = useDispatch()
  const apiCalls = () => {
    dispatch(getStorebyid(`${_.get(storeDetail, "user._store")}`))
    dispatch(loadCancelledBooking(`${_.get(storeDetail, "user._store")}`));
    dispatch(getallPickups(`${_.get(storeDetail, "user._store")}`))
    dispatch(getCityDetails(`${_.get(storeDetail, "user._store")}`))
    dispatch(getrentbookingListBooked(`${_.get(storeDetail, "user._store")}`))
    dispatch(loadOngoingBookings(`${_.get(storeDetail, "user._store")}`))
    dispatch(loadAllRentPool(`${_.get(storeDetail, "user._store")}`));
    dispatch(loadAllBikesListMaintenance(`${_.get(storeDetail, "user._store")}`));
  }
  useEffect(() => {
    getFirstuser()
    apiCalls()
  }, []);
  const logOutFunc = async () => {
    hideDialog()
    dispatch(userTokensaveToReducers(null))
    dispatch(cleanonGoingbooking())
    navigation.closeDrawer()
    try {
      await AsyncStorage.removeItem('@userExist')
    } catch (e) {
      console.log(e)
    }
  }
  // BackHandler.addEventListener('hardwareBackPress', () => {
  //   if(routes.name==='Dashboard'){
  //     showDialog()
  //   }
  //   return()=> true
  // }, [])
  const SLIDER_WIDTH = Dimensions.get("window").width - 35;
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = SLIDER_WIDTH;

  // Use Hooks to control!
  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    stop, // a function  to stopping it
    eventEmitter, // an object for listening some events
  } = useTourGuideController()
  // Can start at mount 🎉
  // you need to wait until everything is registered 😁

  React.useEffect(() => {
    if (canStart && Boolean(userfirst === "true")) {
      // 👈 test if you can start otherwise nothing will happen
      start()
    }
  }, [canStart, userfirst]) // 👈 don't miss it!

  const handleOnStart = () => console.log('start')
  const handleOnStop = () => console.log('stop')
  const handleOnStepChange = () => console.log(`stepChange`)

  React.useEffect(() => {
    // Check that the eventEmitter object is defined
    if (eventEmitter) {
      // Add event listeners to the eventEmitter object
      eventEmitter.on('start', handleOnStart)
      eventEmitter.on('stop', handleOnStop)
      eventEmitter.on('stepChange', handleOnStepChange)

      // Return a function to remove the event listeners when the component unmounts
      return () => {
        eventEmitter.off('start', handleOnStart)
        eventEmitter.off('stop', handleOnStop)
        eventEmitter.off('stepChange', handleOnStepChange)
      }
    }
  }, [eventEmitter])

  const handleOnPress = async (route: string, screenName: string) => {
    try {
      stop()
      await AsyncStorage.setItem("firsttimeuser", JSON.stringify('false'))
    } catch (error) {
      console.log(error)
    }
    dispatch(cleanonGoingbooking())
    if (route === 'work in progress') {
      ToastAndroid.show('work in progress', ToastAndroid.SHORT)
    } else if (route) {
      if (screenName) {
        navigation.navigate(route, { screen: screenName });
      } else {
        navigation.navigate(route);
      }
    } else {
      showDialog()
      setlogoutvisible(true)
    }
  };
  const [refreshing, setrefreshing] = useState(false)
  const onRefresh = () => {
    setrefreshing(true)
    apiCalls()
    setrefreshing(false)
  }
  const renderItem = ({ item, index }: any) => {
    return (
      <TourGuideZone text={item.text} zone={index} shape={'rectangle'} style={[tw`rounded-lg bg-white  m-1.2`, { elevation: 3 }]}>
        <TouchableOpacity onPress={() => handleOnPress(item.route, item.screen)} >
          <View style={[tw`items-center justify-center self-center`, { width: SCREEN_WIDTH / 3.6, height: SCREEN_WIDTH / 3.8 }]}>
            <Image source={item.image} style={tw`h-9.5 w-9.5`} />
            <AppText style={[tw`text-center mt-1.5`, { fontSize: 9 }]}>
              {i18n.t(item.label)}
            </AppText>
          </View>
        </TouchableOpacity>
      </TourGuideZone>
    )
  }
  return (
    <Screen style={{ backgroundColor: '#7B6FFF' }}>
      <CustomActivityIndicator visible={loading} />
      <Portal>
        <Dialog visible={visible} style={tw`bg-white`} onDismiss={hideDialog}>
          <Dialog.Title>
            <AppText style={tw`font-bold text-lg`}>Alert</AppText>
          </Dialog.Title>
          <Dialog.Content>
            <AppText style={tw`text-sm`}>
              Are you sure you want to {logoutvisible ? 'logout' : 'exit'} ?
            </AppText>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>
              <AppText style={tw`text-sm`}>No</AppText>
            </Button>
            <Button onPress={() => {
              logoutvisible ? logOutFunc() : (BackHandler.exitApp(), hideDialog())
            }}>
              <AppText style={tw`text-sm`}>Yes</AppText>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={[tw`w-full`, { flex: 1, backgroundColor: '#7A6FFF' }]}>
        <View style={{ width: 250, height: 250, borderRadius: 250 / 2, backgroundColor: 'rgba(102, 89, 255, 0.4)', position: 'absolute', top: -120, right: 30, }} />
        <View style={{ width: 250, height: 250, borderRadius: 250 / 2, backgroundColor: 'rgba(102, 89, 255, 0.6)', position: 'absolute', right: -128, top: -55 }} />
        <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center', justifyContent: 'space-between', top: 3, height: 90 }}>
          <Entypo name="menu" size={30} color="white" onPress={() => navigation.openDrawer()} />
          <AppText style={[tw`font-semibold text-lg`, { color: 'white', }]}>Boongg</AppText>
          <View style={{ width: 10, height: 10 }} />
        </View>
        <View style={{ paddingHorizontal: 25, marginTop: 8 }}>
          <AppText style={[tw`text-sm`, { color: 'white', fontSize: 19, fontStyle: 'italic' }]}>{i18n.t('Welcome')}!</AppText>
          <AppText style={[tw`text-sm`, { color: 'white', fontSize: 15 }]}>{_.get(storeDetail, "user.username")}</AppText>
        </View>
      </View>
      <View style={{ backgroundColor: 'white', flex: 2.5, borderTopLeftRadius: 32, borderTopRightRadius: 32, alignItems: 'center', justifyContent: 'space-around' }}>
        <View style={[tw`bg-white items-center justify-center w-8.9/10 self-center`, { top: -12, elevation: 3, borderRadius: 18, overflow: 'hidden' }]}>
          <Carousel
            loop
            width={SLIDER_WIDTH}
            height={SLIDER_WIDTH / 2.6}
            data={data}
            scrollAnimationDuration={1000}
            renderItem={({ item }) => item.component}
          />
        </View>
        <View style={{ marginTop: 80, backgroundColor: 'white' }}>
          <FlatList
            data={_.get(storeDetail, 'user.role') !== 'STORE_ADMIN' ? STORE_ADMIN_ITEMS : items}
            renderItem={renderItem}
            numColumns={3}
            keyExtractor={(item, index) => item.text}
            scrollEnabled={false}
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
          <View style={[tw`items-center bg-white`, { top: -40 }]}>
            <AppText style={[tw`text-sm font-semibold`, { color: colors.purple, fontSize: 10 }]}>
              {i18n.t('Please Contact for any queries')}
            </AppText>
            <AppText style={[tw`text-sm`, { color: colors.purple, fontSize: 10 }]}>{_.get(storeDetail, "user.mobileNumber")}</AppText>
          </View>
        </View>
      </View>
    </Screen>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({})