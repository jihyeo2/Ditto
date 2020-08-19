import React from "react";
import { ImageBackground, View, Image, Text, StyleSheet } from "react-native";

import colors from "../config/colors";

function StoreInfoMain({ backImage, frontImage, title, subtitle }) {
  console.log("this is the backImage", backImage);
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: backImage }} style={styles.back}>
        <Image style={styles.front} source={{ uri: frontImage }} />
      </ImageBackground>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingBottom: 15,
    marginBottom: 15,
  },
  imageContainer: {
    marginBottom: 10,
  },
  back: {
    width: "100%",
    height: 200,
    marginBottom: 60,
  },
  front: {
    top: 135,
    alignSelf: "center",
    width: 120,
    height: 120,
    borderColor: colors.white,
    borderWidth: 5,
    borderRadius: 60,
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
    // fontFamily: "Georgia",
    color: colors.dark,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    fontStyle: "italic",
    textAlign: "center",
    textAlignVertical: "auto",
    color: colors.medium,
    paddingHorizontal: 10,
  },
});

export default StoreInfoMain;
