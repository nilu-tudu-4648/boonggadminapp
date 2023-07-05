import tw from "@/lib/tailwind";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";
import AppText from "./AppText";
import PaperBase from "./PaperBase";

interface RentCalculatorCardProps {}

const RentCalculatorCard: React.FC<RentCalculatorCardProps> = (props) => {
  return (
    <PaperBase style={tw`p-3 mb-2`}>
      <View style={tw`flex-row justify-around`}>
        <View style={tw`w-[30%]`}>
          <View style={tw``}>
            <Image
              source={require("@/assets/logo-web.png")}
              style={tw`w-full h-24`}
            />
          </View>
          <View>
            <AppText
              style={tw`text-sm text-center text-violet-800 font-semibold`}>
              Suzuki Access 125
            </AppText>
          </View>
        </View>
        <Divider style={tw`h-full w-0.2`} />
        <View style={tw`w-[60%]`}>
          <View style={tw`items-center my-4`}>
            <AppText style={tw`text-sm font-semibold text-gray-600`}>
              Total Rent
            </AppText>
            <AppText style={tw`text-sm font-semibold text-gray-600`}>
              $5740
            </AppText>
          </View>
          <View style={tw``}>
            <View style={tw`flex-row justify-between`}>
              <AppText style={tw`text-xs text-gray-600 font-semibold`}>
                Monday-Sunday
              </AppText>
              <AppText style={tw`text-xs text-green-700 font-semibold`}>
                $350.0/hr
              </AppText>
            </View>
            <View style={tw`flex-row justify-between`}>
              <AppText style={tw`text-xs text-gray-600 font-semibold`}>
                Saturday-Sunday
              </AppText>
              <AppText style={tw`text-xs text-green-700 font-semibold`}>
                $450.0/day
              </AppText>
            </View>
            <View style={tw`flex-row justify-between`}>
              <AppText style={tw`text-xs text-gray-600 font-semibold`}>
                Monday-Friday
              </AppText>
              <AppText style={tw`text-xs text-green-700 font-semibold`}>
                $350.0/day
              </AppText>
            </View>
            <View style={tw`flex-row justify-between`}>
              <AppText style={tw`text-xs text-gray-600 font-semibold`}>
                Monthly
              </AppText>
              <AppText style={tw`text-xs text-green-700 font-semibold`}>
                $172200.0/month
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </PaperBase>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default RentCalculatorCard;
