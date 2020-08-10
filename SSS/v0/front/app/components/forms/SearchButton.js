import React from "react";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormikContext } from "formik";

import defaultStyles from "../../config/styles";

function SearchButton(props) {
  const { handleSubmit } = useFormikContext();

  return (
    <TouchableWithoutFeedback onPress={handleSubmit}>
      <MaterialCommunityIcons
        name="search-web"
        size={30}
        color={defaultStyles.colors.medium}
        style={styles.searchIcon}
      />
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  searchIcon: {
    alignSelf: "flex-end",
    marginRight: 10,
  },
});

export default SearchButton;
