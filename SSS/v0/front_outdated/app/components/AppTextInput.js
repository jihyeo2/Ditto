import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import SearchButton from "./forms/SearchButton";

function AppTextInput({
  searchButton,
  icon,
  width = "100%",
  textInputStyle,
  ...otherProps
}) {
  return (
    <View style={[styles.container, { width }]}>
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
        style={[defaultStyles.text, styles.text, textInputStyle]}
        {...otherProps}
      />
      {searchButton && <SearchButton />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    marginVertical: 5,
    width: "100%",
    padding: 15,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },

  searchIcon: {
    alignSelf: "flex-end",
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
});

export default AppTextInput;
