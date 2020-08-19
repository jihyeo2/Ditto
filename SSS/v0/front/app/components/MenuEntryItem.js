import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";
import Icon from "../components/Icon";

function MenuEntryItem({ name, price, image }) {
  return (
    <View style={styles.bubble}>
      <View style={styles.infoContainer}>
        <Image style={styles.image} source={image} />
        <View style={styles.textContainer}>
          <AppText style={{ fontWeight: "500" }}>{name}</AppText>
          <AppText style={{ color: colors.third }}>{price}</AppText>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.options}>
            <Icon name="trash-can" size={35} backgroundColor={"brown"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: colors.secondary,
    borderRadius: 20,
    margin: 5,
    padding: 15,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  optionsContainer: { left: "80%" },
  options: { padding: 5 },
});

export default MenuEntryItem;
