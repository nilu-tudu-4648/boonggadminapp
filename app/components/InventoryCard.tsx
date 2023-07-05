import tw from "@/lib/tailwind";
import React from "react";
import _ from 'lodash'
import { Image,  StyleSheet, View } from "react-native";
import { Button, Divider, } from "react-native-paper";
import AppText from "./AppText";
import PaperBase from "./PaperBase";
import Screen from "./Screen";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getsingleRentbikes } from "@/store/rentPool";
import StyleButton from "./StyleButton";

interface InventoryCardProps {
  quantity: number;
  brand: string;
  model: string;
  id: string;
}

const InventoryCard: React.FC<InventoryCardProps> = ({
  quantity,
  brand,
  model,
  id,
}) => {
  const dispatch = useAppDispatch()
  return (
    <Screen style={tw`p-2`}>
      <PaperBase style={tw.style(`p-1.5 h-40`)}>
        <View style={tw.style(`flex-row justify-between`, { flex: 1 })}>
          <View style={tw`flex-row items-center w-2/3`}>
            <Image
              source={require("@/assets/logo-web.png")}
              style={tw`w-32 h-full`}
            />
            <View style={tw.style(`ml-2 flex-shrink`)}>
              <AppText
                style={tw.style(`text-violet-800 text-sm font-semibold `)}>
                {model} {brand}
              </AppText>
            </View>
          </View>
          <StyleButton title="Price Chart" borderColor={'purple'} textStyle={{ fontSize: 8 }} style={{ width: '30%', height: 30 }} onPress={() => {
            dispatch(getsingleRentbikes(id))
          }} />
        </View>
        <Divider />
        <View style={tw`p-1`}>
          <AppText style={tw`text-gray-500 font-semibold text-sm`}>
            Quantity: {quantity}
          </AppText>
        </View>
      </PaperBase>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
  cellStyle: {
    width: 70,
    justifyContent: 'center'
  }
});

export default InventoryCard;
