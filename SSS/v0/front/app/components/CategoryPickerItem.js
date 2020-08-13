import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "../components/Icon";
import AppText from "../components/AppText";
import colors from "../config/colors";
import { color } from "react-native-reanimated";

function CategoryPickerItem({ item, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={(styles.category, { backgroundColor: colors[color] })}
        onPress={onPress}
      >
        <Icon
          backgroundColor={colors.white}
          name={item.icon}
          size={80}
          backgroundColor={colors.white}
          iconColor={colors.white}
        />
        <AppText style={styles.label}>{item.label}</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 10,
    flex: 1,
  },
  category: {
    borderColor: colors.third,
    borderWidth: 2,
    height: 150,
    width: "50%",
    //alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  label: {
    marginTop: 5,
    fontSize: 17,
    textAlign: "center",
  },
});

export default CategoryPickerItem;
