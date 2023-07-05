import _ from "lodash";
import React, { Key, useEffect } from "react";
import { ScrollView, StyleSheet, ToastAndroid, View } from "react-native";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import tw from "@/lib/tailwind";
import { loadCancelledBooking } from "@/store/cancelledBooking";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import BookingDetailsDropDetailsCard from "@/components/BookingDetailsDropDetailsCard";
import ScrollScreen from "@/components/ScrollScreen";


interface HistoryScreenProps { }

const HistoryScreen: React.FC<HistoryScreenProps> = (props) => {
  const { allCancelledBooking, loading } = useAppSelector((state) =>
    state.entities.cancelledBooking);
  const { storeDetail } = useAppSelector((state: any) => state.entities.searchBikes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    ToastAndroid.show('Work in progress,go back', ToastAndroid.SHORT)
    // dispatch(loadCancelledBooking(`${_.get(storeDetail,"user._store")}`));
  }, []);
  // console.log(allCancelledBooking[0].cancellation)
  return (
    <View style={[tw`bg-white`, { flex: 1 }]}>
      {/* <CustomActivityIndicator visible={loading} /> */}

      {/* <ScrollScreen style={{ height: '100%' }}>
        {allCancelledBooking.map((item: { [key: string]: object | any }) => (
          <BookingDetailsDropDetailsCard
            key={item._id}
            item={item}
            mobileNumber={_.get(item, "_webuserId.profile.mobileNumber")}
            userName={_.get(item, "_webuserId.profile.name")}
            email={_.get(item, "_webuserId.email")}
            startDate={item.startDate as string}
            endDate={item.endDate as string}
            bookingType={item.bookingType}
            boonggBookingId={item.boonggBookingId}
            buttonsVisible={true}
          />
        ))}
      </ScrollScreen> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HistoryScreen;
