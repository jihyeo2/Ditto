import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({
  title,
  onPress,
  color = "primary",
  fontSize = 18,
  padding = 15,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }, { padding }]}
      onPress={onPress}
      setOpacityTo={(10, 0.5)}
    >
      <Text style={[styles.text, { fontSize }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    // textTransform: "uppercase",
    fontWeight: "300",
    letterSpacing: 1,
    textShadowColor: colors.black,
    textShadowRadius: 2,
  },
});

export default AppButton;
