import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import SearchButton from "./forms/SearchButton";
import colors from "../config/colors";

function SearchBarAppTextInput({
  searchButton,
  icon,
  width = "100%",
  height,
  ...otherProps
}) {
  return (
    <View style={[styles.container, { width }, { height }]}>
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
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    bottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 15,
    marginLeft: 15,
  },
});

export default SearchBarAppTextInput;
