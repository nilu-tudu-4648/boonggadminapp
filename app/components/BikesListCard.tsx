import tw from "@/lib/tailwind";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox } from "react-native-paper";
import AppText from "./AppText";
import _ from 'lodash'
import PaperBase from "./PaperBase";
import { useDispatch } from "react-redux";
import { getListBrandsRentPool, getSingleRentPool, unblockrentpoll, updateRentBookingtoMaintenance,get } from "@/store/rentPool";
import StyleButton from "./StyleButton";

interface BikesListCardProps {
  items: any
  setvisibleDialog: React.Dispatch<React.SetStateAction<string>>;
  setselectforuploadDocument: React.Dispatch<any>;
  maintenance?: boolean,
  color: string,
  storeDetail: any
}

const BikesListCard: React.FC<BikesListCardProps> = ({
  items,
  setselectforuploadDocument,
  setvisibleDialog,
  maintenance,
  color,
  storeDetail
}) => {
  const dispatch = useDispatch()
  const end = new Date(new Date().setMonth(new Date().getMonth() + 1))
  const start = new Date()
  const maintainfunc = () => {
    dispatch(updateRentBookingtoMaintenance({
      startDate: `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`,
      endDate: `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate() - 1}`,
      reason: "MAINTENANCE",
      brand: items.brand,
      model: items.model || items.vehicleModel,
      store: `${_.get(storeDetail, "user._store")}`,
      rentPool: items.id
    }))
  }
  return (
    <PaperBase style={tw`mb-3 w-9.8/10 self-center`}>
      <View style={tw`flex-row mb-4`}>
        <View style={tw`flex-col w-1/2`}>
          <View style={tw`bg-violet-800 rounded-tl-lg w-full`}>
            <AppText style={[tw`text-center text-neutral-200 font-semibold`, { fontSize: 10 }]}>
              {items.brand} {items.model || items.vehicleModel}
            </AppText>
          </View>
          <View style={tw`my-3.2`}>
            <AppText style={[tw`text-center text-gray-600`, { fontSize: 10 }]}>
              Registration No. : {_.get(items, "registrationNumber") || _.get(items, "_rentPoolKey.registrationNumber")}
            </AppText>
          </View>
          <View style={[tw`self-center justify-center items-center w-20`, { backgroundColor: color, borderRadius: 3 }]}>
            <AppText style={[tw`text-center text-neutral-200 font-semibold`, { fontSize: 10 }]}>
              {items.isBlockBike ? _.get(items, "blocking.reason") : _.get(items, "statusType.type")}
            </AppText>
          </View>
        </View>
        <View style={tw`w-1/2`}>
          <View style={tw`flex-row items-center`}>
            <Checkbox
              status={(_.get(items, "rcFiles", []).length || _.get(items, "_rentPoolKey.rcFiles", []).length) ? "checked" : "unchecked"}
              color={tw.color("bg-violet-800")}
            />
            <View style={tw`flex-1`}>
              <AppText style={[tw`text-center font-semibold`, { fontSize: 10 }]}>
                RC
              </AppText>
            </View>
          </View>
          <View style={tw`flex-row items-center`}>
            <Checkbox
              status={(_.get(items, "pucFiles", []).length || _.get(items, "_rentPoolKey.pucFiles", []).length) ? "checked" : "unchecked"}
              color={tw.color("bg-violet-800")}
            />
            <View style={tw`flex-1`}>
              <AppText style={[tw`text-center font-semibold`, { fontSize: 10 }]}>
                PUC
              </AppText>
            </View>
          </View>
          <View style={tw`flex-row items-center`}>
            <Checkbox
              status={(_.get(items, "licenceFiles", []).length || _.get(items, "_rentPoolKey.licenceFiles", []).length) ? "checked" : "unchecked"}
              color={tw.color("bg-violet-800")}
            />
            <View style={tw`flex-1`}>
              <AppText style={[tw`text-center font-semibold`, { fontSize: 10 }]}>
                Insurance
              </AppText>
            </View>
          </View>
        </View>
      </View>
      <View style={[tw`rounded-md my-1 flex-row justify-end items-center p-1`]}>
        <StyleButton title="Maintenance" borderColor="#E45C00" onPress={() => {
          maintenance ?
            dispatch(unblockrentpoll(_.get(items, "_id"))) :
            maintainfunc()
        }} />
        <StyleButton title="Upload" borderColor="#17A1FA" onPress={() => {
          setvisibleDialog("UploadimageDialog")
          dispatch(getSingleRentPool(maintenance ? items._rentPoolKey._id : items._id))
          setselectforuploadDocument(items)
        }} />
        <StyleButton title="Edit" borderColor="purple" onPress={() => {
          dispatch(getSingleRentPool(maintenance ? items._rentPoolKey._id : items._id))
          dispatch(getListBrandsRentPool())
          setvisibleDialog("EditRentpollDialog")
        }} />
      </View>
    </PaperBase>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(BikesListCard);
