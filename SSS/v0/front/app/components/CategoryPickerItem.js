import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "../components/Icon";
import AppText from "../components/AppText";
import colors from "../config/colors";

function CategoryPickerItem({ item, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.category} onPress={onPress}>
        <Icon
          backgroundColor={colors.white}
          name={item.icon}
          size={80}
          backgroundColor={colors.white}
          iconColor={colors.black}
        />
        <AppText style={styles.label}>{item.label}</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
  },
  category: {
    borderColor: colors.black,
    borderWidth: 2,
    height: 150,
    width: 150,
    alignItems: "center",
    padding: 15,
  },
  label: {
    marginTop: 5,
    fontSize: 17,
    textAlign: "center",
  },
});

export default CategoryPickerItem;
