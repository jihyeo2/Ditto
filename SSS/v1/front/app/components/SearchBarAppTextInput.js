import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import SearchButton from "./forms/SearchButton";

function SearchBarAppTextInput({
  searchButton,
  icon,
  width = "100%",
  height,
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
        style={[defaultStyles.text, styles.text]}
        {...otherProps}
      />
      {searchButton && <SearchButton />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 20,
    flexDirection: "row",
    marginVertical: 5,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    bottom: 10,
  },
  icon: {
    marginRight: 10,
  },

  searchIcon: {
    alignSelf: "flex-end",
    marginRight: 5,
  },
  text: {
    alignSelf: "flex-start",
    flex: 1,
    fontSize: 15,
    marginLeft: 15,
  },
});

export default SearchBarAppTextInput;
