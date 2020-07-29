import React from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import colors from "../config/colors";

function AppTextInput({
  clickButton,
  icon,
  width = "100%",
  height = "100%",
  textInputStyle,
  onPress,
  ...otherProps
}) {
  return (
    <View style={[styles.container, { width }, { height }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={25}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, textInputStyle]}
        {...otherProps}
      />
      {clickButton && (
        <TouchableWithoutFeedback onPress={onPress}>
          <MaterialCommunityIcons
            name="search-web"
            size={30}
            color={defaultStyles.colors.medium}
            style={styles.searchIcon}
          />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },

  searchIcon: {
    alignSelf: "flex-end",
    marginRight: 10,
  },
});

export default AppTextInput;
