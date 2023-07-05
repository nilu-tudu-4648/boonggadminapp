import tw from "@/lib/tailwind";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  BackHandler,
  Dimensions,
  FlatList,
  ImageBackground,
  ListRenderItem,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import moment from 'moment'
import AppText from "@/components/AppText";

import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchBikestocreateBookings, getCoupenList, stepCountValuesaveToReducers } from "@/store/createBooking";
import ActivityIndicator from "@/components/CustomActivityIndicator";

import colors from '../../config/colors';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { i18n } from '../../../language'
import routes from "@/navigation/routes";
import AppButton from "@/components/AppButton";
import ScrollScreen from "@/components/ScrollScreen";
import _ from "lodash";
interface CreateBookingScreenProps {
  navigation: any
  route: any
}
interface FlatListprops {
  name: string;
  weekEndPrice: number;
  quantity: number;
  brand: string;
  modelName: string;
  thumbUrl: string;
  rentCalculated: string;
}

const { width, height } = Dimensions.get("window");

const CreateBookingScreen: React.FC<CreateBookingScreenProps> = ({ navigation, route }) => {
  const { allfetchBikes, loading, UserbyMobileNo, } =
    useAppSelector((state) => state.entities.createBooking);
  const { storeName, currentCity } =
    useAppSelector((state: any) => state.entities.searchBikes);
  const { mobilenotofetch } = route.params;
  // const [mobilenotofetch, setmobilenotofetch] = useState("9096101957");
  const [dateerror, setdateerror] = useState('');
  const [startDate, setstartDate] = useState<Date | undefined>(new Date());
  const [endDate, setendDate] = useState<Date | undefined>(new Date());
  const [dateVisible, setdateVisible] = useState({
    startDate: false,
    endDate: false
  });
  const [selectedDate, setselectedDate] = useState("");
  const Item = ({ data }: { data: FlatListprops }) => (
    <TouchableOpacity
      disabled={data.quantity === 0}
      onPress={() => {
        dispatch(getCoupenList())
        dispatch(stepCountValuesaveToReducers(1))
        navigation.navigate(routes.CREATEBOOKINGPAYSCREEN.route, {
          selectedBike: data,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          mobilenotofetch
        })
      }}
      style={[
        tw`bg-white m-2 p-2.2 rounded-xl justify-between `,
        { elevation: 4, width: 160, height: 210 },
      ]}>
      <ImageBackground source={{ uri: data.thumbUrl }} style={tw`h-20 w-full`}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: data.quantity === 0 ? '#ffffff66' : 'default',
        }}>
          {
            data.quantity === 0 &&
            <Text style={{
              color: 'white',
              fontSize: 24
            }}>Sold Out</Text>
          }
        </View>
      </ImageBackground>
      <View style={[tw`flex-row justify-between items-center`]}>
        <Text style={[tw`font-semibold `, { fontSize: 8.5 }]}>{data.brand}</Text>
        <Text style={[tw`font-semibold `, { fontSize: 8.5 }]}>Price</Text>
      </View>
      <View style={[tw`flex-row justify-between items-center`]}>
        <Text style={[tw`font-bold`, { fontSize: 10.5 }]}>{data.modelName}</Text>
        <Text style={[tw``, { fontSize: 10.5 }]}>₹ {Number(data.rentCalculated)}</Text>
      </View>
      <View
        style={[tw`h-8 justify-center rounded-md items-center`, { backgroundColor: colors.purple }]}>
        <Text style={[tw`text-white font-bold`, { fontSize: 11 }]}>Book Now</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem: ListRenderItem<FlatListprops> = ({ item }) => (
    <Item data={item} />
  );

  const dispatch = useDispatch();


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    if (selectedDate === 'startDate') {
      setdateVisible({ ...dateVisible, startDate: true })
      setstartDate(date)
      if (9 > new Date(date).getHours()) {
        ToastAndroid.show(`Start time should be after 9am`, ToastAndroid.SHORT)
        setdateerror(`Start time should be after 9am`)
      } else {
        setdateerror(``)
      }
    } else {
      setdateVisible({ ...dateVisible, endDate: true })
      setendDate(date)
      if (new Date(startDate) > date) {
        ToastAndroid.show(`End date and time can't be less than start time.`, ToastAndroid.SHORT)
        setdateerror(`End date and time can't be less than start time.`)
      } else if (21 <= new Date(date).getHours()) {
        ToastAndroid.show(`End time should be before 9pm`, ToastAndroid.SHORT)
        setdateerror(`End time should be before 9pm`)
      }
      else {
        const a = moment(startDate);
        const b = moment(date);
        const diffhours = b.diff(a, 'hours')
        const diffminutes = new Date(date).getMinutes()
        if (diffhours <= 6 && diffminutes > 1) {
          ToastAndroid.show(`Time difference between start time and end time should be minimum 6 hrs.`, ToastAndroid.SHORT)
          setdateerror(`Time difference between start time and end time should be minimum 6 hrs.`)
        } else {
          setdateerror(``)
        }
      }
    }
    hideDatePicker();
  };
  BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.replace(routes.DASHBOARD.route)
    return () => true
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ActivityIndicator visible={loading} />
      <ScrollScreen style={{ height: '100%' }}>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
        />
        <View
          // keyboardShouldPersistTaps='always'
          style={[tw`p-2 w-full bg-white items-center justify-between`]}>
          {/* Ongoing BookingDetails */}
          {/* {
            rentbookinguserOngoing.length !== 0 ?
              <View
                style={[
                  tw`p-1 my-2 w-full justify-between bg-${'gray'}-200`,
                  { elevation: 2, borderRadius: 8 },
                ]}>
                <AppText style={{ fontSize: 12 }}>User Booking already exists </AppText>
                {
                  rentbookinguserOngoing.map((item: { [key: string]: object | any, }, i: number) =>
                    <AppText style={{ fontSize: 12 }} key={i}>{item.boonggBookingId}</AppText>
                  )
                }
              </View> : null
          } */}
          {/* EmailBox */}
          <View
            style={[
              tw`p-2 my-1 w-full justify-between bg-white`,
              { elevation: 2, borderRadius: 8, height: height * 0.16 },
            ]}
          >
            <AppText style={[tw`font-semibold `, { fontSize: 14, color: colors.purple }]}>
              Email Address
            </AppText>
            <AppText style={tw`text-sm`}>{UserbyMobileNo && UserbyMobileNo[0]?.email || UserbyMobileNo?.data?.email}</AppText>
            <AppText style={[tw`font-semibold `, { fontSize: 14, color: colors.purple }]}>
              Username
            </AppText>
            <AppText style={tw`text-sm`}>
              {UserbyMobileNo && UserbyMobileNo[0]?.profile.name || UserbyMobileNo?.data?.profile.name}
            </AppText>
          </View>
          <View
            style={[
              tw`flex-row justify-between items-center  p-2`
            ]}>
            <View style={tw`w-1/2 m-1`}>
              <AppText style={[tw`font-semibold `, { fontSize: 12.5, color: colors.purple }]}>
                Start Date/Start Time
              </AppText>
              <TouchableOpacity onPress={() => {
                showDatePicker()
                setselectedDate("startDate")
              }} style={[tw`p-3 w-full rounded-md flex-row items-center justify-center`, { backgroundColor: '#FFF0F0' }]}>
                <MaterialIcons
                  name="date-range"
                  size={24}
                  color={colors.purple}
                  style={tw`mr-1`}
                />
                <AppText style={tw`text-xs font-semibold text-gray-600`}>
                  {moment(startDate).format('lll')}
                  {/* {dateVisible.startDate ? `${moment(startDate).format('lll')}` : 'Start Date/Start Time'} */}
                </AppText>
              </TouchableOpacity>
            </View>
            <View style={tw`w-1/2 m-1`}>
              <AppText style={[tw`font-semibold `, { fontSize: 12.5, color: colors.purple }]}>
                End Date/End Time
              </AppText>
              <TouchableOpacity onPress={() => {
                showDatePicker()
                setselectedDate("endDate")
              }} style={[tw`p-3 w-full rounded-md flex-row items-center justify-center`, { backgroundColor: '#FFF0F0' }]}>
                <MaterialIcons
                  name="date-range"
                  size={24}
                  color={colors.purple}
                  style={tw`mr-1`}
                />
                <AppText style={tw`text-xs font-semibold text-gray-600`}>
                  {moment(endDate).format('lll')}
                  {/* {dateVisible.endDate ? `${moment(endDate).format('lll')}` : 'End Date/End Time'} */}
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
          {
            dateerror ?
              <AppText style={tw`text-xs font-semibold text-red-400`}>
                {dateerror}
              </AppText> : null
          }
          <AppButton disabled={Boolean(dateerror)} title="Search Bikes" onPress={() => {
            // dateVisible.startDate && dateVisible.endDate ?
            dispatch(
              fetchBikestocreateBookings({
                startDate: Date.parse(startDate),
                endDate: Date.parse(endDate),
                storeName,
                city: _.get(currentCity, '_city.name')
              }))
            //  : ToastAndroid.show('Please select start date and end date', ToastAndroid.SHORT)
          }} />
          <View
            style={[
              {
                height: height * 0.4,
                alignItems: "center",
                justifyContent: "center",
                width: '100%'
              },
            ]}>
            {
              allfetchBikes.length ?
                <AppText style={[tw`text-sm font-bold m-1 self-start`]}>Available Near You</AppText>
                : allfetchBikes.length === 0 ?
                  <AppText style={[tw`text-sm font-bold m-1 self-start`]}>No Bikes Available</AppText> : null
            }
            <FlatList
              horizontal={true}
              data={allfetchBikes}
              renderItem={renderItem}
              keyExtractor={(item: FlatListprops) => item.modelName}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollScreen>
    </View>
  );
};

export default CreateBookingScreen;
