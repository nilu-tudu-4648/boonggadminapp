
import BikesListCard from "@/components/BikesListCard";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import EditRentpollDialog from "@/components/EditRentpollDialog";
import Screen from "@/components/Screen";
import UploadimageDialog from "@/components/UploadimageDialog";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import tw from "@/lib/tailwind";
import { loadAllBikesListMaintenance, loadAllRentPool } from "@/store/rentPool";
import { useNavigationState } from "@react-navigation/native";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";

interface OnbookingScreenProps { }

const OnbookingScreen: React.FC<OnbookingScreenProps> = (props) => {
  const { loading, allBookedrentPool, updateRentPooliddata, updateRentBookingtoMaintenanceData
   } = useAppSelector((state) => state.entities.rentPool);
  const { storeDetail } = useAppSelector((state: any) => state.entities.searchBikes);
  const dispatch = useAppDispatch();
  const [selectforuploadDocument, setselectforuploadDocument] = useState({})
  const [visibleDialog, setvisibleDialog] = useState("")
  const [localbooked, setlocalbooked] = useState<any[]>([])
  const [isLongterm, setisLongterm] = useState(false)
  const navigationState = useNavigationState(state => state);
  const activeRouteName = navigationState.routes[navigationState.index].name;
  useEffect(() => {
    if (isLongterm) {
      setlocalbooked(allBookedrentPool.filter(item => item.isLongTerm))
    } else {
      setlocalbooked(allBookedrentPool)
    }
  }, [isLongterm, allBookedrentPool]);
  useEffect(() => {
    if (activeRouteName === 'OnBooking') {
      dispatch(loadAllBikesListMaintenance(`${_.get(storeDetail, "user._store")}`));
      dispatch(loadAllRentPool(`${_.get(storeDetail, "user._store")}`));
    }
  }, [updateRentPooliddata, updateRentBookingtoMaintenanceData]);
  return (
    <Screen style={tw`p-1 bg-white`}>
      <CustomActivityIndicator visible={loading} />
      <UploadimageDialog
        visible={visibleDialog === "UploadimageDialog"}
        setvisibleDialog={setvisibleDialog}
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
        data={localbooked}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) =>
          <BikesListCard
            key={item._id}
            items={item}
            color={'red'}
            storeDetail={storeDetail}
            setselectforuploadDocument={setselectforuploadDocument}
            setvisibleDialog={setvisibleDialog}
          />} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(OnbookingScreen);
