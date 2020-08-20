import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";
import Icon from "./Icon";

function CachedMenu({ menu, onChangeMenu }) {
  return (
    <View style={styles.bubble}>
      <View style={styles.infoContainer}>
        <Image style={styles.image} source={{ uri: menu.image }} />
        <View style={styles.textContainer}>
          <AppText style={{ fontWeight: "500" }}>{menu.name}</AppText>
          <AppText style={{ color: colors.third }}>{menu.price}</AppText>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.options} onPress={onChangeMenu}>
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

export default CachedMenu;
