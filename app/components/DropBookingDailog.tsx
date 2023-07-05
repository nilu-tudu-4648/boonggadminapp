import tw from "@/lib/tailwind";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import AppText from "./AppText";

interface DropBookingDailogProps {}

const DropBookingDailog: React.FC<DropBookingDailogProps> = (props) => {
  return (
    <Portal>
      <Dialog visible={true}>
        <Dialog.Title>Drop Booking</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label={<AppText style={tw`text-xs`}>Email</AppText>}
            value={text}
            onChangeText={(text) => setText(text)}
            dense
            style={tw`text-xs h-11`}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button>Cancel</Button>
          <Button>Drop Vehicle</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default DropBookingDailog;
