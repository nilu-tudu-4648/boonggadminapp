import { useAppSelector } from "@/hooks/useAppSelector";
import tw from "@/lib/tailwind";
import { RootState } from "@/types/RootStateType";
import React from "react";
import AppText from "./AppText";
import { i18n } from '../../language'
import { View, StyleSheet, } from 'react-native';
interface PickupDropStatsCardProps { }

const PickupDropStatsCard: React.FC<PickupDropStatsCardProps> = (props) => {
  const { todaysDrop } = useAppSelector((state: RootState) => state.entities.ongoingBooking);
  const { todayspickUp } = useAppSelector((state) => state.entities.pickupStore);
  return (
    <View style={tw`p-0.5`}>
      <View style={[tw`p-4 mt-2 max-h-36 flex-row bg-white`]}>
        <View style={tw`items-center w-1/2`}>
          <AppText style={[tw`text-gray-800 font-semibold`, { fontSize: 15 }]}>{i18n.t("Today's Pickup")}</AppText>
          <AppText style={[tw`text-gray-800 font-semibold`, { fontSize: 15 }]}>{todayspickUp.length}</AppText>
        </View>
        <View style={tw`border-r border-slate-200 h-full`} />
        <View style={tw`items-center w-1/2`}>
          <AppText style={[tw`text-gray-800 font-semibold`, { fontSize: 15 }]}>{i18n.t("Today's Drops")}</AppText>
          <AppText style={[tw`text-gray-800 font-semibold`, { fontSize: 15 }]}>{todaysDrop.length}</AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PickupDropStatsCard;
