import tw from "@/lib/tailwind";
import colors from "../config/colors";
import _ from "lodash";
import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import {  Dialog, Portal, RadioButton } from "react-native-paper";
import AppText from "./AppText";
import StyleButton from "./StyleButton";
import { webuserupdatedetails } from "@/store/pickUpStore";
import { useDispatch } from "react-redux";

interface UserRemarkDialogProps {
  visible: boolean;
  bookingforCheckIn: object | undefined;
  storeDetail: object | undefined;
  //FIXME: check the function signature for this key
  hideDialog: Dispatch<SetStateAction<string>>;
}

const UserRemarkDialog: React.FC<UserRemarkDialogProps> = ({
  visible,
  hideDialog,
  storeDetail,
  bookingforCheckIn
}) => {
  const [checked, setChecked] = React.useState(false);
  const [remark, setremark] = React.useState<string>('');
  const dispatch = useDispatch()
  return (
    <Portal>
      <Dialog style={tw`bg-white p-1`} visible={visible} onDismiss={() => hideDialog('')}>
        <AppText style={[tw`m-3 font-bold `, { color: colors.purple, fontSize: 16 }]}>{`User Remark Form`}</AppText>
        <Dialog.Content style={tw`w-full p-2  justify-between items-center`}>
          <View style={tw`flex-row w-full justify-between`}>
            <View style={tw`flex-row items-center`}>
              <RadioButton
                value="first"
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!checked)}
              />
              <AppText style={tw`text-xs`}>Block User</AppText>
            </View>
            <View style={tw`flex-row items-center`}>
              <RadioButton
                value="second"
                status={!checked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!checked)}
              />
              <AppText style={tw`text-xs`}>UnBlock User</AppText>
            </View>
          </View>
          <View style={tw`w-full`}>
            <AppText style={tw`text-xs`}>User Remark</AppText>
            <TextInput
              multiline={true}
              value={remark}
              onChangeText={(t) => setremark(t)}
              placeholder="User Feedback"
              style={[tw`h-41 w-full p-2`, {
                textAlignVertical: 'top', fontSize: 10,
                borderColor: 'gray', borderWidth: .5
              }]} />
          </View>
        </Dialog.Content>
        <StyleButton title="Save" borderColor="green"
          textStyle={{ fontSize: 11 }}
          style={{
            width: '30%', height: 30,
            alignSelf: 'flex-end', margin: 4, top: -2, right: 4
          }} onPress={() => {
            hideDialog('')
            dispatch(webuserupdatedetails({
              remark: remark + "  " + `${_.get(storeDetail,"user.username")}`,
              id: _.get(bookingforCheckIn, "_webuserId._id"),
              blockUser: checked
            }))
          }} />
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(UserRemarkDialog);
