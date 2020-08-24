import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";

import colors from "../config/colors";

function CategoryWithImageItem({ item, onPress }) {
  let staticUri = null;
  switch (item.imageUri) {
    case 0:
      staticUri = require("../assets/restaurant.jpg");
      break;
    case 1:
      staticUri = require("../assets/grocery.jpg");
      break;
    case 2:
      staticUri = require("../assets/coffee.jpg");
      break;
    case 3:
      staticUri = require("../assets/cloth.jpg");
      break;
    case 4:
      staticUri = require("../assets/bar.jpg");
      break;
    case 5:
      staticUri = require("../assets/market.png");
      break;
    case 6:
      staticUri = require("../assets/barber.jpg");
      break;
    case 7:
      staticUri = require("../assets/other.jpg");
      break;
    default:
      break;
  }
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <ImageBackground style={styles.imageUri} source={staticUri}>
        <Text style={styles.label}>{item.label}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "50%",
    height: 159,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  imageUri: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 23,
    fontWeight: "400",
    // fontFamily: "Georgia",
    color: colors.white,
    textAlign: "center",
    textShadowColor: colors.black,
    textShadowRadius: 5,
  },
});

export default CategoryWithImageItem;
