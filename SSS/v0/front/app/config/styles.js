import { Platform } from "react-native";

import colors from "./colors";

export default {
  colors,
  text: {
    color: colors.dark,
    fontSize: 18,
    fontFamily:
      Platform.OS === "android" ? "sans-serif-light" : "Malayalam Sangam MN",
  },
};
