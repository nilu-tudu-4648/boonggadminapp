import BikesListCard from "@/components/BikesListCard";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import Screen from "@/components/Screen";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { loadAllBikesListMaintenance, loadAllRentPool } from "@/store/rentPool";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import tw from "@/lib/tailwind";
import UploadimageDialog from "@/components/UploadimageDialog";
import EditRentpollDialog from "@/components/EditRentpollDialog";
import _ from "lodash";
import { Checkbox } from "react-native-paper";
import { useNavigationState } from "@react-navigation/native";



const ManitenanceNavigator: React.FC = () => {
  const { loading, allBikesAvailableandBookedandMaintenance, updateRentBookingtoMaintenanceData,
    updateRentPooliddata, unblockRentPooliddata } = useAppSelector((state) => state.entities.rentPool);
  const { storeDetail } = useAppSelector((state: any) => state.entities.searchBikes);
  const [selectforuploadDocument, setselectforuploadDocument] = useState({})
  const [visibleDialog, setvisibleDialog] = useState("")
  const [localMaintance, setlocalMaintance] = useState<any[]>([])
  const [isLongterm, setisLongterm] = useState(true)
  const dispatch = useAppDispatch();
  const navigationState = useNavigationState(state => state);
  const activeRouteName = navigationState.routes[navigationState.index].name;
  useEffect(() => {
    if (isLongterm) {
      setlocalMaintance(allBikesAvailableandBookedandMaintenance.filter(ite => !ite.statusType && ite._rentPoolKey))
    } else {
      setlocalMaintance(allBikesAvailableandBookedandMaintenance.filter(ite => !ite.statusType && ite._rentPoolKey && ite.isLongTerm))
    }
  }, [isLongterm, allBikesAvailableandBookedandMaintenance, updateRentPooliddata]);
  useEffect(() => {
    if (activeRouteName === 'Maintenance') {
      dispatch(loadAllBikesListMaintenance(`${_.get(storeDetail, "user._store")}`));
      dispatch(loadAllRentPool(`${_.get(storeDetail, "user._store")}`));
    }
  }, [updateRentBookingtoMaintenanceData, unblockRentPooliddata, updateRentPooliddata]);
  return (
    <Screen style={tw`p-1 bg-white`}>
      <CustomActivityIndicator visible={loading} />
      <UploadimageDialog
        visible={visibleDialog === "UploadimageDialog"}
        setvisibleDialog={setvisibleDialog}
        maintenance={true}
        selectforuploadDocument={selectforuploadDocument}
      />
      <EditRentpollDialog
        visible={visibleDialog === "EditRentpollDialog"}
        setvisibleDialog={setvisibleDialog}
      />
      <Checkbox.Item
        status={isLongterm ? "checked" : "unchecked"}
        label='Is Long term'
        style={{ width: 200 }}
        labelStyle={{ fontSize: 10 }}
        color={tw.color("bg-violet-800")}
        onPress={() => setisLongterm(!isLongterm)}
      />
      <FlatList
        data={localMaintance}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) =>
          <BikesListCard
            storeDetail={storeDetail}
            key={item._id} items={item}
            setselectforuploadDocument={setselectforuploadDocument}
            setvisibleDialog={setvisibleDialog}
            color={'#E45C00'}
            maintenance={true} />} />
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {},
});

export default ManitenanceNavigator;
