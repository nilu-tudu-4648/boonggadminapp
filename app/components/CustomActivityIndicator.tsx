import React from "react";
import { View, ActivityIndicator } from "react-native";
import tw from "../lib/tailwind";
import colors from "../config/colors";

const CustomActivityIndicator = ({ visible }: { visible: boolean }) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={[tw`absolute bg-white h-full w-full justify-center opacity-60 z-10`]}>
      <ActivityIndicator size={55} color={colors.purple} />
    </View>
  );
};

export default React.memo(CustomActivityIndicator);
