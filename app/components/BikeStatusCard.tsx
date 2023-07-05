import { useAppSelector } from "@/hooks/useAppSelector";
import tw from "@/lib/tailwind";
import _ from "lodash";
import { setallAvailablerentPoolData, setallBookedrentPoolData, setBikesAvailableandBookedData } from "@/store/rentPool";
import { i18n } from '../../language';
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";
import { useDispatch } from "react-redux";
import AppText from "./AppText";

interface BikeStatusCardProps { }

const BikeStatusCard: React.FC<BikeStatusCardProps> = (props) => {
  const { allRentPool, allBikesListMaintenance } = useAppSelector((state) => state.entities.rentPool);
  const [allRentPoolIdsAvailable, setallRentPoolIdsAvailable] = useState<any>([])
  const [onGoingRentBooking, setonGoingRentBooking] = useState<any>([])
  const [idmaintance, setidmaintance] = useState<any>([])
  const dispatch = useDispatch()
  useEffect(() => {
    const checkFunc = () => {
      try {
        const allavailable = allRentPool.filter(ite => ite.statusType.type === "AVAILABLE").map(ite => ite._id)
        const allBooked = allRentPool.filter(ite => ite.statusType.type === "BOOKED").map(ite => ite._id)
        const idmaintancedata = allBikesListMaintenance.filter(ite => _.get(ite, "_rentPoolKey._id")).map(ite => _.get(ite, "_rentPoolKey._id"))

        setidmaintance(allBikesListMaintenance.filter(ite => _.get(ite, "_rentPoolKey._id")).map(ite => _.get(ite, "_rentPoolKey._id")))

        const available = allRentPool.filter(ite => ite.statusType.type === "AVAILABLE" && !idmaintancedata.includes(ite.id))
        const booked = allRentPool.filter(ite => ite.statusType.type === "BOOKED" && !idmaintancedata.includes(ite.id))

        dispatch(setBikesAvailableandBookedData([...booked, ...available, ...allBikesListMaintenance]))
        setallRentPoolIdsAvailable(allavailable.filter(item => !idmaintancedata.includes(item)))
        setonGoingRentBooking(allBooked.filter(item => !idmaintancedata.includes(item)))

        // dispatch(setallAvailablerentPoolData(allRentPool.filter(ite => ite.statusType.type === "AVAILABLE").filter(item => !idmaintancedata.includes(item._id))))
        // dispatch(setallBookedrentPoolData(allRentPool.filter(ite => ite.statusType.type === "BOOKED").filter(item => !idmaintancedata.includes(item._id))))
      } catch (error) {
        console.log(error)
      }
    }
    if (allBikesListMaintenance && allRentPool) {
      checkFunc()
    }
  }, [allBikesListMaintenance, allRentPool])

  return (
    <View style={tw`p-0.5`}>
      <View style={tw.style(`p-2`)}>
        <View style={tw`mb-3`}>
          <AppText style={tw`text-center font-semibold `}>{i18n.t('Bikes')}</AppText>
        </View>
        <View style={tw`flex-row justify-around`}>
          <View
            style={tw`w-[27%] py-.5 items-center bg-red-600 justify-center rounded-lg`}>
            <AppText style={tw`text-neutral-200`}>{idmaintance?.length}</AppText>
            <AppText style={[tw`text-neutral-200`, { fontSize: 10.5 }]}>{i18n.t('Maintenance')}</AppText>
          </View>
          <Divider style={tw`h-full w-0.2 bg-slate-500`} />
          <View
            style={tw`w-[27%] py-.5 items-center bg-green-800 justify-center rounded-lg`}>
            <AppText style={tw` text-neutral-200`}>{allRentPoolIdsAvailable.length}</AppText>
            <AppText style={[tw` text-neutral-200`, { fontSize: 10.5 }]}>{i18n.t('Available')}</AppText>
          </View>
          <Divider style={tw`h-full w-0.2 bg-slate-500`} />
          <View
            style={tw`w-[27%] py-.5 items-center bg-orange-400 justify-center rounded-lg`}>
            <AppText style={[tw` text-neutral-200`]}>{onGoingRentBooking.length}</AppText>
            <AppText style={[tw` text-neutral-200`, { fontSize: 10.5 }]}>{i18n.t('On-Going')}</AppText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default BikeStatusCard;
