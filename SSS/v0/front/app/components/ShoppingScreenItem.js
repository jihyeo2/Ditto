import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import colors from "../config/colors";

function ShoppingScreenItem({ title, image, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <ImageBackground style={styles.image} source={image}>
        <Text style={styles.title}>{title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "50%",
    height: 155,
    //borderRadius: 15,
    backgroundColor: colors.white,
    //marginVertical: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 23,
    fontWeight: "400",
    fontFamily: "Georgia",
    color: colors.white,
    textAlign: "center",
    textShadowColor: colors.black,
    textShadowRadius: 5,
  },
});

export default ShoppingScreenItem;
