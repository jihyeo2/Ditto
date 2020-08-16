import React from "react";
import { StyleSheet, Text } from "react-native";
import colors from "../config/colors";
import { TouchableHighlight } from "react-native";
import styles from "../config/styles";

function StoreCard({
  title,
  subtitle,
  backImage,
  frontImage,
  distance,
  onPress,
}) {
  return (
    <TouchableHighlight style={styles.container} onPress={onPress}>
      <ImageBackground style={styles.back} source={backImage} />

      <View style={styles.detailsContainer}>
        <Image style={styles.front} source={frontImage} />

        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.distanceText}>{distance}</Text>
          </View>
          <Text style={styles.subtitleText}>{subtitle}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: "100%",
    height: 300,
    borderRadius: 15,
    overflow: "hidden",
  },
  back: {
    width: "100%",
    height: 190,
    marginbottom: 30,
  },
  front: {
    top: 150,
    left: "10%",
    width: 100,
    height: 100,
    borderColor: colors.white,
    borderWidth: 3,
    borderRadius: 50,
  },
  detailsContainer: {
    flexDirection: "row",
  },
  textContainer: {
    padding: 15,
  },
  titleContainer: {
    flexDirection: "horizontal",
  },
  titleText: {},
  subtitleText: {
    color: colors.medium,
  },
  distanceText: {
    color: colors.secondary,
    fontSize: 13,
  },
});

export default StoreCard;
