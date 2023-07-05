import { Platform, Dimensions } from "react-native";
import colors from "./colors";
const { width, height } = Dimensions.get("screen");

export const SIZES = { height, width }
export default {
  SIZES,
  colors,
  text: {
    fontSize: 14,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: colors.dark,
  },
};
